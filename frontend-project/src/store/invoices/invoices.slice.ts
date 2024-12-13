//!!!FIX - This entire slice is unnecessary, because there is only one page that handles invoices. Thus, there is no
//         need to handle them in a global state within the Redux store :(
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invoice} from "../../types/invoice";

/**
 * State interface that defines invoice result data
 */
interface InvoicesState {
  /** The list of Invoice objects present in this result set */
  invoices: Invoice[];
  /** The total number of invoices that exist in the server */
  total: Record<string, number>;
  /** Determines if the invoice data is still loading */
  loading: boolean;
  /** Represents an error returned from the server while attempting to pull invoices */
  error: string | null;
}

/**
 * The initial state of data for invoice result data pulled from the backend API
 */
const initialState: InvoicesState = {
  invoices: [],
  total: {},
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoices(state, action: PayloadAction<Invoice[]>) {
      state.invoices = action.payload;
    },
    setTotal(state, action: PayloadAction<Record<string, number>>) {
      state.total = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
});

export const {setInvoices, setTotal, setLoading, setError} = invoicesSlice.actions;
export default invoicesSlice.reducer;