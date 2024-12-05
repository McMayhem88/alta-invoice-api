import apiClient from "./client";
import {Invoice, InvoiceResultData} from "../types/invoice";
import {Util} from "../utils/util";
import {Decimal} from "decimal.js";

interface GetInvoicesParams {
  page?: number;
  count?: number;
}

const getInvoiceData = (data: any): Invoice | null => {
  const invoice = {
    id: data?.id || null,
    vendor_name: data?.vendor_name || null,
    amount: new Decimal(data?.amount || 0) || null,
    due_date: new Date(data?.due_date) || null,
    description: data?.description || null,
    user_id: data?.user_id || null,
    paid: data?.paid || false,
  };
  
  if (Util.isAnyNull(invoice.id, invoice.vendor_name, invoice.amount, invoice.due_date, invoice.user_id)) {
    console.error('There was an invoice with invalid data!', data);
    return null;
  }
  
  return invoice;
};

export const getInvoiceResultData = async (params: GetInvoicesParams = {}): Promise<InvoiceResultData> => {
  return await apiClient.get('/invoices', {params})
                        .then((response) => {
                          const resultData: {
                            results: Invoice[],
                            total: number,
                            page: number,
                            isLastPage: boolean,
                          } = {
                            results: [],
                            total: response.data?.total || 0,
                            page: response.data?.page || 0,
                            isLastPage: response.data?.isLastPage || false,
                          };
                          
                          // Parse out the invoices
                          const invoices = response.data?.results || [];
                          invoices.forEach((item: any) => {
                            const invoice = getInvoiceData(item);
                            if (invoice !== null) {
                              resultData.results.push(invoice);
                            }
                          });
                          
                          return resultData;
                        });
};

export const getInvoiceById = async (id: number): Promise<Invoice | null> => {
  const response = await apiClient.get(`/invoices/${id}`);
  return getInvoiceData(response.data);
};
