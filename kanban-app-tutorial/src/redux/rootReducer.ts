import { combineReducers } from "@reduxjs/toolkit";
import { firestoreApi } from "./services/apiSlice";
import featuresReducer from "./features/appSlice";

export const rootReducer = combineReducers({
  features: featuresReducer,
  [firestoreApi.reducerPath]: firestoreApi.reducer,
});
