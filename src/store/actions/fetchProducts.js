import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../APIs/API";

export const fetchProducts = createAsyncThunk(
  'user/fetchProducts',
  async (_, thunkAPI) => {
    const response = await api.getProducts()
    return response.data.products;
  }
)