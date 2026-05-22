import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import transactionReducer from "./slices/transactionSlice";
import analyticsReducer from "./slices/analyticsSlice";

export const store = configureStore({
  reducer: { 
    account: accountReducer,
    transactions: transactionReducer,
    analytics: analyticsReducer
  },
});