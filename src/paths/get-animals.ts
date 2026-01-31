import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Logger } from "../helpers/logger.js";
import { queryDatabase, getDBdetails } from "../helpers/dbQueryHandler.js";
import { populateView } from "../helpers/paginator.js";
import { removeEmptyEntries } from "../helpers/jsonPrettifier.js";
import { convertMeta } from "../helpers/metaHandler.js";
import { Species, Gender } from "../enums/enums.js";
import { icarBatchResultSeverityType } from "../enums/icarEnums.js";

import type { Context } from "openapi-backend";
import type { Request, Response } from "express";
import type { OperationHandler, OperationResponse, Components, icarAnimalCoreResourceArray, icarAnimalCoreResource } from '../types/combinedURLScheme.js';
import type { DBQueryResult } from "../types/dbRecords.js";


/**
 * Returns a function that handles animal requests.
 * @param {Context} c
 * @param {Request} req
 * @param {Response} res
 * @returns {OperationHandler<typeof URL_OPERATION_ID>}
 */
export const getAnimalsHandler: OperationHandler<"get_animals"> = async (
  c: Context,
  req: Request,
  res: Response
) => {
  const locationScheme = c.request.params["location-scheme"];
  const locationId = c.request.params["location-id"];

  res.set("Content-Type", "application/json");

  let animals: icarAnimalCoreResourceArray;
  let totalItems = 0;
  try {
    [animals, totalItems] = await getAnimals(locationScheme, locationId, req.query.currentPage, req.query.pageSize);
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

  const response: OperationResponse<"get_animals"> = {
    view: await populateView(req.path, req.query, totalItems),
    member: animals,
  };
  return res.status(StatusCodes.ACCEPTED).json(response);  
}

// Returns an array of milking visit events in ICAR ADE format and the total number of milking visit events in the database.
async function getAnimals(
  locationScheme: string,
  locationId: string,
  currentPage?: string,
  pageSize?: string
): Promise<[icarAnimalCoreResourceArray, number]> {
  const records = await queryDatabase(locationScheme, locationId, "get-animals", currentPage, pageSize);

  const nReceived = records.length;
  let animals: icarAnimalCoreResourceArray = [];
  let totalItems = 0;
  if (nReceived > 0) {
    totalItems = records[0].totalitems as number;
    for (let record of records) {
      const animal = await convertAnimalToADEFormat(record, locationScheme, locationId);
      animals.push(animal);
    }
  }
  Logger.info(new Date(Date.now()).toISOString(),
    `Received ${nReceived} of ${totalItems} animal records from database.`);
  return [animals, totalItems];
}

// Returns a single animal in ICAR ADE format.
async function convertAnimalToADEFormat(
  record: DBQueryResult<"get-animals">, locationScheme: string, locationId: string
) {
  const dbDetails = await getDBdetails(locationScheme, locationId);
  const animal: icarAnimalCoreResource = {
    resourceType: "??", // Uniform resource identifier (URI) or shortname of the logical resourceType. The ResourceType catalog defines the set of allowed resourceTypes.
    meta: await convertMeta(record, dbDetails.dbUrl),
    location: {
      id: locationId,
      scheme: locationScheme
    },
    specie: record["animal.specie"] as Species,
    gender: record["animal.gender"] as Gender,
    birthDate: record["animal.birthdate"] ?? undefined,
    primaryBreed: {
      id: record["animal.breed.id"] ?? undefined,
      scheme: record["animal.breed.scheme"] ?? undefined
    },
    name: record["animal.name"] ?? undefined,
    identifier: {
      id: record["animal.identifier.id"],
      scheme: record["animal.identifier.scheme"],
    },
  };
  const filteredAnimal = removeEmptyEntries(animal);
  return filteredAnimal;
}
