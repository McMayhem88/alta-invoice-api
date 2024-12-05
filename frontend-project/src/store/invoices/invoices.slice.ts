import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Invoice} from "../../types/invoice";

interface InvoicesState {
  invoices: Invoice[];
  total: Record<string, number>;
  loading: boolean;
  error: string | null;
}

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