import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import authSlice from "./reducers/authSlice";

const rootReducer = combineReducers({
auth: authSlice
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware]
})