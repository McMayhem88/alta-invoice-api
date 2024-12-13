import {Invoice} from "@prisma/client";

/**
 * Result data interface to allow for passing back pagination information in a response when pagination is enabled
 */
export interface ResultData {
  /** The list of invoices returned by the request (on the current page) */
  results: Invoice[];
  /** The total number of results returned from the query */
  total: number;
  /** The current page of the results set */
  page: number;
  /** Determines if the current page is the last page in the results set */
  isLastPage: boolean;
}