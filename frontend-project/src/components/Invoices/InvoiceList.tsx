import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getInvoiceResultData} from "../../api/invoices";
import {InvoiceResultData} from "../../types/invoice";
import InvoiceModal from "./InvoiceModal";

const InvoiceList = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const count = 7;
  
  const {data, error, isLoading} = useQuery<InvoiceResultData, Error>({
    queryKey: ['invoices', page, count],
    queryFn: () => getInvoiceResultData({page, count}),
  });
  
  const isPaginated = data ? data.page > 0 : false;
  const totalPages = (data && isPaginated) ? Math.ceil(data.total / count) : 0;
  
  if (isLoading) {
    return <p>Loading invoices...</p>;
  }
  if (error) {
    return <p>There was an error while trying to fetch the invoices: {error.message}</p>;
  }
  
  return (
    <div>
      <h2 className="text-2xl mb-4">Invoices</h2>
      <table className="border px-4 py-2 w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-blue-50">Vendor</th>
            <th className="border px-4 py-2 bg-blue-50">Amount</th>
            <th className="border px-4 py-2 bg-blue-50">Due Date</th>
            <th className="border px-4 py-2 bg-blue-50">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.results?.map((invoice) => (
            <tr
              key={invoice.id}
              // NOTE - The following onClick method was chosen to satisfy the requirement that the '/invoices/:id'
              // endpoint be used to pull data for the invoice details modal. In a practical scenario, I would just use
              // the current `invoice` object as the `selectedInvoice` instead of the id since it's already been pulled
              // and save the need for another backend API call.
              onClick={() => setSelectedInvoice(invoice.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border px-4 py-2">{invoice.vendor_name}</td>
              <td className="border px-4 py-2">
                {invoice.amount.toNumber().toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </td>
              <td className="border px-4 py-2">{invoice.due_date.toLocaleDateString()}</td>
              <td className="border px-4 py-2">{invoice.paid ? 'Paid' : 'Open'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {(isPaginated && totalPages > 1) && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
          Page {page} of {totalPages}
        </span>
          <button
            onClick={() => setPage((old) => (data && old < totalPages ? old + 1 : old))}
            disabled={data && page === totalPages}
            className="px-3 py-1 border rounded ml-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      
      {selectedInvoice && (
        <InvoiceModal id={selectedInvoice} onClose={() => setSelectedInvoice(null)}/>
      )}
    </div>
  );
};

export default InvoiceList;