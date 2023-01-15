import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../APIs/API";

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async (query: string) => {
    if (query) {
      const response = await api.getSearchedProducts(query)
      return response.data
    }
    const response = await api.getProducts()
    return response.data.products;
  }
)