import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Logger } from "../helpers/logger.js";
import { queryDatabase, getDBdetails } from "../helpers/dbQueryHandler.js";
import { populateView } from "../helpers/paginator.js";
import { removeEmptyEntries } from "../helpers/jsonPrettifier.js";
import { convertMeta, convertTraitLabel } from "../helpers/metaHandler.js";
import { Quarter, MilkingRemark, MilkCharacteristic, MilkCharacteristicUnit } from "../enums/enums.js";
import { icarBatchResultSeverityType } from "../enums/icarEnums.js";

import type { Context } from "openapi-backend";
import type { Request, Response } from "express";
import type { Operations, OperationHandler, OperationResponse, Components, icarMilkingVisitEventArray, icarMilkingVisitEventResource } from '../types/milkURLScheme.js';
import type { DBQueryResult, DBQueryKey } from "../types/milkDBrecord.js";

const DB_OPERATION_ID: DBQueryKey = "get-milking-visits";
const URL_OPERATION_ID: keyof Operations = "get_milking_visits";

/**
 * Returns a function that handles milking visits requests.
 * @param {Context} c
 * @param {Request} req
 * @param {Response} res
 * @returns {OperationHandler<typeof URL_OPERATION_ID>}
 */
export const getMilkingVisitsHandler: OperationHandler<typeof URL_OPERATION_ID> = async (
  c: Context,
  req: Request,
  res: Response
) => {
  const locationScheme = c.request.params["location-scheme"];
  const locationId = c.request.params["location-id"];
  const metaModifiedFrom = c.request.query["meta-modified-from"];
  const metaModifiedTo = c.request.query["meta-modified-to"];

  res.set("Content-Type", "application/json");

  let milkingVisits: icarMilkingVisitEventArray;
  let totalItems = 0;
  try {
    [milkingVisits, totalItems] = await getMilkingVisits(locationScheme, locationId, metaModifiedFrom, metaModifiedTo, req.query.currentPage, req.query.pageSize);
  } catch (err) {
    Logger.error(err);
    let errorResponse: Components.Responses.Default = {
      errors: [{
        type: ReasonPhrases.NOT_FOUND,
        severity: icarBatchResultSeverityType.Error,
        status: StatusCodes.NOT_FOUND,
        title: "An error has occured while handling the request. Check the content of the message for the error details.",
        detail: err.message,
        instance: null
    }]};
    if (err instanceof ReferenceError) {
      return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
    } else {
      errorResponse.errors[0].type = ReasonPhrases.INTERNAL_SERVER_ERROR
      errorResponse.errors[0].status = StatusCodes.INTERNAL_SERVER_ERROR
      errorResponse.errors[0].detail = `${err}`;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }

  const response: OperationResponse<typeof URL_OPERATION_ID> = {
    view: await populateView(req.path, req.query, totalItems),
    member: milkingVisits,
  };
  return res.status(StatusCodes.ACCEPTED).json(response);  
}

// Returns an array of milking visit events in ICAR ADE format and the total number of milking visit events in the database.
async function getMilkingVisits(
  locationScheme: string,
  locationId: string,
  metaModifiedFrom: string,
  metaModifiedTo: string,
  currentPage?: string,
  pageSize?: string
): Promise<[icarMilkingVisitEventArray, number]> {
  const records = await queryDatabase(locationScheme, locationId, DB_OPERATION_ID, metaModifiedFrom, metaModifiedTo, currentPage, pageSize);

  const nReceived = records.length;
  let milkingVisits: icarMilkingVisitEventArray = [];
  let totalItems = 0;
  if (nReceived > 0) {
    totalItems = records[0].totalitems as number;
    for (let record of records) {
      const milkingVisit = await convertMilkingVisitEventToADEFormat(record, locationScheme, locationId);
      milkingVisits.push(milkingVisit);
    }
  }
  Logger.info(new Date(Date.now()).toISOString(),
    `Received ${nReceived} of ${totalItems} milking visit records from database.`);
  return [milkingVisits, totalItems];
}

// Returns a single milking visit event in ICAR ADE format.
async function convertMilkingVisitEventToADEFormat(
  record: DBQueryResult<typeof DB_OPERATION_ID>, locationScheme: string, locationId: string
) {
  const dbDetails = await getDBdetails(locationScheme, locationId);
  const milkingVisit: icarMilkingVisitEventResource = {
    resourceType: "??", // Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
    meta: await convertMeta(record, dbDetails.dbUrl),
    location: {
      id: locationId,
      scheme: locationScheme
    },
    id: record.id,
    eventDateTime: record.eventdatetime,
    traitLabel: await convertTraitLabel(record),
    responsible: record.responsible,
    contemporaryGroup: record.contemporarygroup,
    remark: record.remark,
    animal: {
      id: record["animal.id"],
      scheme: record["animal.scheme"],
    },
    milkingStartingDateTime: record.milkingstartingdatetime,
    milkingDuration: await convertMilkingDuration(record),
    milkingVisitDuration: await convertMilkingVisitDuration(record),
    milkingType: record.milkingtype,
    milkingMilkWeight: {
      unitCode: "KGM",
      value: record["milkingmilkweight.value"]
    },
    milkingComplete: record.milkingcomplete == "true",
    milkingParlourUnit: record.milkingparlourunit,
    milkingBoxNumber: record.milkingboxnumber,
    milkingDeviceId: record.milkingdeviceid,
    measureDeviceId: record.measuredeviceid,
    milkingShiftLocalStartDate: record.milkingshiftlocalstartdate,
    milkingShiftNumber: record.milkingshiftnumber,
    quarterMilkings: await convertQuarterMilkings(record),
    animalMilkingSample: await convertMilkingSamples(record),
    milkCharacteristics: await convertMilkCharacteristics(record),
    milkingRemarks: await convertMilkingRemarks(record)
  };
  const filteredMilkingVisit = removeEmptyEntries(milkingVisit);
  return filteredMilkingVisit;
}

// Returns milking duration in ICAR ADE format.
async function convertMilkingDuration(record: DBQueryResult<typeof DB_OPERATION_ID>, quarter?: Quarter, visit?: boolean) {
  let key: "milkingduration" | "milkingvisitduration" | `quartermilkings.${Quarter}.quartermilkingduration`;
  key = "milkingduration";
  if (visit) key = "milkingvisitduration";
  else if (quarter) key = `quartermilkings.${quarter}.quartermilkingduration`;

  const milkingDuration: icarMilkingVisitEventResource["milkingDuration"] = {
    unitCode: record[`${key}.unitcode`],
    value: record[`${key}.value`]
  }
  let filteredMilkingduration = removeEmptyEntries(milkingDuration);
  if (Object.keys(filteredMilkingduration).length == 0) filteredMilkingduration = null;
  return filteredMilkingduration;
}

// Returns milking visit duration in ICAR ADE format.
async function convertMilkingVisitDuration(record: DBQueryResult<typeof DB_OPERATION_ID>) {
  return convertMilkingDuration(record, null, true);
}

// Returns milk characteristics in ICAR ADE format.
async function convertMilkCharacteristics(record: DBQueryResult<typeof DB_OPERATION_ID>, quarter?: Quarter) {
  let key: "milkcharacteristics.characteristic" | `quartermilkings.${Quarter}.icarquartercharacteristics`;
  key = "milkcharacteristics.characteristic";
  if (quarter) {
    key = `quartermilkings.${quarter}.icarquartercharacteristics`;
  }
  let milkCharacteristics: icarMilkingVisitEventResource["milkCharacteristics"] = [];
  for (const char of Object.values(MilkCharacteristic)) {
    if (record.hasOwnProperty(`${key}.${char}.value`)) {
      const milkCharacteristic: icarMilkingVisitEventResource["milkCharacteristics"][0] = {
        characteristic: char,
        value: record[`${key}.${char}.value`],
        unit: record.hasOwnProperty(`${key}.${char}.unit`) ? record[`${key}.${char}.unit`]: MilkCharacteristicUnit[char],
        measuringDevice: record[`${key}.${char}.measuringdevice`]
      }
      const filteredMilkCharacteristic = removeEmptyEntries(milkCharacteristic);
      milkCharacteristics.push(filteredMilkCharacteristic);
    }
  }
  return milkCharacteristics;
}

// Returns an array of quarter milkings in ICAR ADE format.
async function convertQuarterMilkings(record: DBQueryResult<typeof DB_OPERATION_ID>) {
  let quarterMilkings: icarMilkingVisitEventResource["quarterMilkings"] = []
  for (const quarter of Object.values(Quarter)) {
    if (!record.hasOwnProperty(`quartermilkings.${quarter}.quartermilkingweight.value`)) {
      continue;
    }
    const quarterMilking = await convertSingleQuarterMilking(record, quarter);
    quarterMilkings.push(quarterMilking);
  }
  return quarterMilkings;
}

// Returns a single quarter milking in ICAR ADE format.
async function convertSingleQuarterMilking(record: DBQueryResult<typeof DB_OPERATION_ID>, quarter: Quarter) {
  const quarterMilking: icarMilkingVisitEventResource["quarterMilkings"][0] = {
    icarQuarterId: quarter,
    xposition: record[`quartermilkings.${quarter}.xposition`],
    yposition: record[`quartermilkings.${quarter}.yposition`],
    zposition: record[`quartermilkings.${quarter}.zposition`],
    quarterMilkingDuration: await convertMilkingDuration(record, quarter),
    quarterMilkingWeight: {
      unitCode: "KGM",
      value: record[`quartermilkings.${quarter}.quartermilkingweight.value`]
    },
    icarQuarterMilkingSample: await convertMilkingSamples(record, quarter),
    icarQuarterCharacteristics: await convertMilkCharacteristics(record, quarter)
  }
  const filteredQuarterMilking = removeEmptyEntries(quarterMilking);
  return filteredQuarterMilking;
}

// Returns an array of milking samples in ICAR ADE format.
async function convertMilkingSamples(record: DBQueryResult<typeof DB_OPERATION_ID>, quarter?: Quarter) {
  let key: "animalmilkingsample" | `quartermilkings.${Quarter}.icarquartermilkingsample`;
  key = "animalmilkingsample";
  if (quarter) key = `quartermilkings.${quarter}.icarquartermilkingsample`;
  let milkingSamples: icarMilkingVisitEventResource["animalMilkingSample"] = [];
  // TODO: Can there be more than one milking sample per one milking visit?
  // Here it is assumed that only one sample is returned from database query.
  const milkingSample = {
    bottleIdentifierType: record[`${key}.bottleidentifiertype`],
    rackNumber: record[`${key}.racknumber`],
    bottlePosition: record[`${key}.bottleposition`],
    bottleIdentifier: record[`${key}.bottleidentifier`],
    validSampleFillingIndicator: record[`${key}.validsamplefillingindicator`],
    operator: record[`${key}.operator`]
  }
  const filteredMilkingSample = removeEmptyEntries(milkingSample);
  if (Object.keys(filteredMilkingSample).length > 0) milkingSamples.push(filteredMilkingSample);
  return milkingSamples;
}

// Returns an array of milking remarks in ICAR ADE format.
async function convertMilkingRemarks(record: DBQueryResult<typeof DB_OPERATION_ID>) {
  let remarks: icarMilkingVisitEventResource["milkingRemarks"] | void = Object.keys(MilkingRemark).map(key => {
    const remarkKey = key as keyof typeof MilkingRemark;
    if (record[`milkingremarks.${remarkKey}`] == "true") {
      return MilkingRemark[remarkKey];
    }
  });
  const filteredRemarks = removeEmptyEntries(remarks)
  return filteredRemarks;
}
