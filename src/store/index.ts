import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import authSlice from "./reducers/authSlice";
import productsSlice from "./reducers/productsSlice";
import postSlice from "./reducers/postSlice";
import notificationSlice from "./reducers/notificationSlice";
import cartSlice from "./reducers/cartSlice";


const rootReducer = combineReducers({
  auth: authSlice,
  products: productsSlice,
  posts: postSlice,
  notification: notificationSlice,
  cart: cartSlice
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware]
});
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
