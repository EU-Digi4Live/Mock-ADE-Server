import fs from "fs";
import dotenv from "dotenv";
import yaml from "js-yaml";
import mssql from "mssql";
import { Logger } from "./logger.js";
import { connect } from "ts-postgres";
import { setQueryOffsetAndLimit } from "./paginator.js";

import type { DBQueryResult, DBQueryKey } from "../types/milkDBrecord.js";

dotenv.config();
const { SQL_QUERIES_FILEPATH, SQL_CONFIG_FILEPATH, LOCATIONS_FILEPATH } = process.env;

// Read SQL queries and ids available
let sqlQueries: Record<dbDetailsType["dbType"], milkingOperationQueries>;
fs.readFile(SQL_QUERIES_FILEPATH, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  sqlQueries = yaml.load(data) as Record<dbDetailsType["dbType"], milkingOperationQueries>;
});

// Read SQL config
let sqlConfig: sqlConfigType;
fs.readFile(SQL_CONFIG_FILEPATH, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  sqlConfig = yaml.load(data) as sqlConfigType;
});

// Read location schemes and ids available
let locations: LocationsType = {};
fs.readFile(LOCATIONS_FILEPATH, 'utf8', (err: Error, data: string) => {
  if (err) {
    console.error(err);
    return;
  }
  locations = yaml.load(data) as LocationsType;
});

/**
 * Returns database access details of the farm. 
 * @param {string} locationScheme The scheme id for the location identifier.
 * @param {string} locationId The unique identifier for the location.
 * @returns {dbDetailsType}
 */
export async function getDBdetails(locationScheme: string, locationId: string) {
  if (!locations.hasOwnProperty(locationScheme)
    || !locations[locationScheme].hasOwnProperty(locationId)) {
      throw new ReferenceError("The requested location-scheme and/or location-id does not exist.");
  }
  const dbDetails: dbDetailsType = {
    "dbType": locations[locationScheme][locationId].dbType,
    "dbUrl": locations[locationScheme][locationId].dbUrl,
    "dbName": locations[locationScheme][locationId].dbName,
    "dbUser": locations[locationScheme][locationId].dbUser,
    "dbPassword": locations[locationScheme][locationId].dbPassword,
  }
  return dbDetails;
}

/**
 * Sends a database query to get the milking-visits for a certain location. Returns the query result.
 * @param {string} locationScheme The scheme id for the location identifier.
 * @param {string} locationId The unique identifier for the location.
 * @param {DBQueryKey} operationId
 * @param {string} metaModifiedFrom The start of the date-time range for the data to get in the request. Optional.
 * @param {string} metaModifiedTo The end of the date-time range for the data to get in the request. Optional.
 * @param {string} currentPage Pagination parameter. Optional.
 * @param {string} pageSize Pagination parameter. Optional.
 * @returns {DBQueryResult<"get-milking-visits">[]}
 */
export async function queryDatabase(
  locationScheme: string,
  locationId: string,
  operationId: DBQueryKey,
  metaModifiedFrom?: string,
  metaModifiedTo?: string,
  currentPage?: string,
  pageSize?: string
  ) {
    const dbDetails: dbDetailsType = await getDBdetails(locationScheme, locationId)
    sqlConfig.user = dbDetails.dbUser;
    sqlConfig.password = dbDetails.dbPassword;
    sqlConfig.database = dbDetails.dbName;
    sqlConfig.server = dbDetails.dbUrl;
  
    const dbClient = sqlQueries[dbDetails.dbType].dbClient;
    const query = await getQuery(dbDetails.dbType, operationId, {metaModifiedFrom, metaModifiedTo, currentPage, pageSize});
  
    let records: DBQueryResult<"get-milking-visits">[] = [];
    try {
      Logger.debug("Connecting database:", dbDetails);
      Logger.debug("to send query:", query);
  
      if (dbClient == "postgres") {
        const client = await connect(sqlConfig);
        const labelsAndValues = await client.query(query);
        labelsAndValues.rows.forEach((row) => {
          let record = {};
          row.forEach((value, i) => {
            record = Object.assign({ [`${labelsAndValues.names[i]}`]: value }, record);
          });
          records.push(record as DBQueryResult<"get-milking-visits">);
        });
      } else if (dbClient == "mssql") {
        await mssql.connect(sqlConfig);
        const dbResult = await mssql.query<DBQueryResult<"get-milking-visits">>(query);
        records = dbResult.recordset;
  
      // // TODO: Add new database clients here
      // } else if (dbClient == "some other client") {
      //   // TODO: Connect database
      //   // TODO: Send query (specify it in config/sqlQueries.yaml first)
      //   // TODO: Convert result into MilkingVisitEventDB[] format
  
      } else {
        throw ReferenceError("Query not implemented for the requested database system.");
      }
    } catch (err) {
      Logger.error(err);
      throw ReferenceError("Could not query the requested database.");
    };

    return records;
}

// Returns database query statement.
async function getQuery(dbType: dbDetailsType["dbType"], operationId: DBQueryKey, queryParams: {
  metaModifiedFrom: string,
  metaModifiedTo: string,
  currentPage: string,
  pageSize: string
} = {
  metaModifiedFrom: undefined,
  metaModifiedTo: undefined,
  currentPage: undefined,
  pageSize: undefined
}) {
  let query: string  = sqlQueries[dbType][operationId];
  query = await setDateTimeRange(query, queryParams.metaModifiedFrom, queryParams.metaModifiedTo);
  query = await setQueryOffsetAndLimit(query, queryParams.currentPage, queryParams.pageSize);
  return query;  
}

// Deletes unused WHERE statements from the database query statement, and returns it with keywords ':metaModifiedFromDateTime' and ':metaModifiedToDateTime' replaced with parameter values.
async function setDateTimeRange(
  query: string,
  metaModifiedFrom?: string,
  metaModifiedTo?: string
  ): Promise<string> {
    const metaModifiedFromDateTime = getISOdatetime(metaModifiedFrom);
    const metaModifiedToDateTime = getISOdatetime(metaModifiedTo);

    // In the SQL query there are three different WHERE statements related to datetime range.
    // At least two of them needs to be removed, depending on which filtering parameters the user provides.
    const whereIndices = [...query.matchAll(RegExp("WHERE", "g"))].map(occurrence => occurrence.index);
    const orderIndex = query.match(RegExp("ORDER")).index;
    const whereStatements = whereIndices.map((substringIndex, i) => query.substring(substringIndex, whereIndices.at(i+1) || orderIndex));
    const whereBetween = whereStatements.find(whereStatement => whereStatement.includes("BETWEEN"));
    const whereFrom = whereStatements.find(whereStatement => whereStatement.includes(">"));
    const whereTo = whereStatements.find(whereStatement => whereStatement.includes("<"));

    if (metaModifiedFrom == null && metaModifiedTo == null) {
        query = query.replace(whereBetween, "").replace(whereFrom, "").replace(whereTo, "");
    } else if (metaModifiedFrom != null && metaModifiedTo != null) {
        query = query.replace(whereFrom, "").replace(whereTo, "");
        query = query.replace(":metaModifiedFromDateTime", metaModifiedFromDateTime).replace(":metaModifiedToDateTime", metaModifiedToDateTime);
    } else if (metaModifiedFrom != null) {
        query = query.replace(whereBetween, "").replace(whereTo, "");
        query = query.replace(":metaModifiedFromDateTime", metaModifiedFromDateTime);
    } else if (metaModifiedTo != null) {
        query = query.replace(whereBetween, "").replace(whereFrom, "");
        query = query.replace(":metaModifiedToDateTime", metaModifiedToDateTime);
    }
    return query;
}

// Returns datatimeStr in the ISO datetime format.
function getISOdatetime(
  datetimeStr: string | null
  ): ReturnType<typeof Date.prototype.toISOString> | null {
    const datetimeISO = datetimeStr ? new Date(datetimeStr).toISOString(): null;
    Logger.debug(`Converted ${datetimeStr} to ISO string ${datetimeISO}.`)
    return datetimeISO;
}

/* ********************* Type and interface declarations ********************* */

type milkingOperationQueries = {
  "dbClient": "mssql" | "postgres";
  } & {[k in DBQueryKey]: string};

export interface sqlConfigType {
  server: string,
  database: string,
  user: string,
  password: string
}

export type dbDetailsType = {
  dbType: "d" | "l" | "d_37" | "exampleDB",
  dbUrl: string,
  dbName: string,
  dbUser: string,
  dbPassword: string
}

interface LocationsType { [key: string]: {[key: string]: dbDetailsType} };
