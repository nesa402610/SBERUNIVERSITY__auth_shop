import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../APIs/API";

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async () => {
    const response = await api.getProducts()
    return response.data.products;
  }
)