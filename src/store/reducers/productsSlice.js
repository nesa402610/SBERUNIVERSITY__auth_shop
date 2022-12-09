import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "../actions/fetchProducts";

const initialState = {
  products: [],
  isLoading: false,
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchProducts.fulfilled.type]: (state, action) => {
      state.isLoading = false
      state.products = action.payload
    },
    [fetchProducts.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchProducts.rejected.type]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default productsSlice.reducer