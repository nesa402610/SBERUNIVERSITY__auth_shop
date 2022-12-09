import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import authSlice from "./reducers/authSlice";
import productsSlice from "./reducers/productsSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  products: productsSlice
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware]
});