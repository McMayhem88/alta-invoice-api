import {Invoice} from "@prisma/client";

export interface ResultData {
  results: Invoice[];
  total: number;
  page: number;
  isLastPage: boolean;
}