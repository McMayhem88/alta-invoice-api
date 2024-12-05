import React from "react";
import {useQuery} from "@tanstack/react-query";
import {Invoice} from "../../types/invoice";
import {getInvoiceById} from "../../api/invoices";

interface InvoiceModalProps {
  id: number;
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({id, onClose}) => {
  
  const {data: invoice, error, isLoading} = useQuery<Invoice | null, Error>({
    queryKey: ['invoices', id],
    queryFn: () => getInvoiceById(id),
  });
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96 relative text-left">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <svg height="24px" viewBox="0 0 512 512" width="24px" fill="#555">
            <g>
              <path
                d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z    M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8   l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76   l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7   c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"/>
            </g>
          </svg>
        </button>
        <h2 className="text-xl mb-4">Invoice Details</h2>
        {isLoading && (
          <p>Loading details...</p>
        )}
        {(invoice && !error) ? (
          <>
            <p><strong>Vendor Name</strong>: {invoice.vendor_name}</p>
            <p><strong>Amount</strong>: {invoice.amount.toNumber().toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}</p>
            <p><strong>Due Date</strong>: {invoice.due_date.toLocaleDateString()}</p>
            <p><strong>Description</strong>: {invoice.description}</p>
            <p><strong>Status</strong>: {invoice.paid ? 'Paid' : 'Open'}</p>
          </>
        ) : (
          <p>There was an error while pulling the invoice details: {error?.message || ''}</p>
        )}
      </div>
    </div>
  );
};

export default InvoiceModal;