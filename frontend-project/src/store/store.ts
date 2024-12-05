import {configureStore} from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice';
import invoicesReducer from './invoices/invoices.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;