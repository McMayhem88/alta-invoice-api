import {Decimal} from "decimal.js";

export interface Invoice {
  id: number;
  vendor_name: string;
  amount: Decimal;
  due_date: Date;
  description: string;
  user_id: number;
  paid: boolean;
}

export interface InvoiceResultData {
  results: Invoice[];
  total: number;
  page: number;
  isLastPage: boolean;
}