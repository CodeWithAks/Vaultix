import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
  reducer: { 
    account: accountReducer,
    transactions: transactionReducer,
  },
});