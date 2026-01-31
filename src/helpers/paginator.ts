import dotenv from "dotenv";
import { removeEmptyEntries } from "./jsonPrettifier.js";

import type { Request } from "express";
import type { icarDailyMilkingAveragesCollection } from "../types/combinedURLScheme.js"

dotenv.config();
const PAGE_SIZE = process.env.PAGE_SIZE;
const START_PAGE = 0;

/**
 * Returns the paginated database query statement with its keywords ':pageSize' and ':offset' replaced with pageSize and currentPage values, respectively.
 * @param {string} query Database query statement
 * @param {string} currentPage Defaults to 0.
 * @param {string} pageSize Defaults to page size specified in environment variables.
 * @returns {string}
 */
export async function setQueryOffsetAndLimit(
  query: string,
  currentPage: string = START_PAGE.toString(),
  pageSize: string = PAGE_SIZE
) {
  const offset = parseInt(currentPage) * parseInt(pageSize);
  query = query.replace("':pageSize'", pageSize).replace("':offset'", offset.toString());
  return query;
}

/**
 * Returns pagination view in ICAR ADE format.
 * @param {string} endpoint URL path
 * @param {Request["query"]} query URL query parameters
 * @param {number} totalItems Defaults to 0.
 * @returns {icarDailyMilkingAveragesCollection["view"]}
 */
export async function populateView(
  endpoint: string,
  query: Request["query"],
  totalItems: number = 0
) {
  const currentPageInt = query.hasOwnProperty("currentPage") ? parseInt(query.currentPage) : START_PAGE;
  const pageSizeInt = query.hasOwnProperty("pageSize") ? parseInt(query.pageSize) : parseInt(PAGE_SIZE);
  const totalPages = Math.ceil(totalItems/pageSizeInt);
  const view: icarDailyMilkingAveragesCollection["view"] = {
      totalItems: totalItems,
      totalPages: totalPages,
      pageSize: pageSizeInt,
      currentPage: currentPageInt,
      first: formatQueryParams(endpoint, query, START_PAGE, pageSizeInt),
      next: currentPageInt < totalPages - 1 ? formatQueryParams(endpoint, query, currentPageInt + 1, pageSizeInt) : undefined,
      prev: currentPageInt > 0 ? formatQueryParams(endpoint, query, currentPageInt - 1, pageSizeInt) : undefined,
      last: formatQueryParams(endpoint, query, Math.max(START_PAGE, totalPages - 1), pageSizeInt),
  };
  const filteredView = removeEmptyEntries(view);
  return filteredView;
}

// Returns an URL with query string.
function formatQueryParams(
  endpoint: string,
  query: Request["query"],
  currentPage?: number,
  pageSize?: number
) {
  const newQuery: Request["query"] = { ...query, currentPage: currentPage, pageSize: pageSize };
  let queryStr = "";
  for (const key of Object.keys(newQuery)) {
    queryStr = queryStr.concat("&", key, "=", newQuery[key])
  }
  queryStr = queryStr.substring(1);   // Remove beginning &
  return `${endpoint}?${queryStr}`;
}