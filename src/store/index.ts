import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import authSlice from "./reducers/authSlice";
import productsSlice from "./reducers/productsSlice";
import postSlice from "./reducers/postSlice";


const rootReducer = combineReducers({
  auth: authSlice,
  products: productsSlice,
  posts: postSlice
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware]
});
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
