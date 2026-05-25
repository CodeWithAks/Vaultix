import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import transactionReducer from "./slices/transactionSlice";
import analyticsReducer from "./slices/analyticsSlice";
import statsReducer from "./slices/statsSlice";
import cardReducer from "./slices/cardSlice";

export const store = configureStore({
  reducer: { 
    account: accountReducer,
    transactions: transactionReducer,
    analytics: analyticsReducer,
    stats:statsReducer,
    cards:cardReducer
  },
});