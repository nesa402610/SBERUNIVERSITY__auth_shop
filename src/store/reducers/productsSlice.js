import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "../actions/fetchProducts";

const initialState = {
  products: [],
  searchText: null,
  isLoading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.searchText = action.payload
    }
  },
  extraReducers: {
    [fetchProducts.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    [fetchProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default productsSlice.reducer;
export const {filterProducts, setSearch} = productsSlice.actions;