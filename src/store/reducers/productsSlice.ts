import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchProducts} from "../actions/fetchProducts";
import {IProduct} from "../../types";

interface productSliceProps {
  products: IProduct[]
  searchText: string
  isLoading: boolean
  error: string
}

const initialState: productSliceProps = {
  products: [],
  searchText: '',
  isLoading: false,
  error: ''
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
    [fetchProducts.fulfilled.type]: (state, action: PayloadAction<IProduct[]>) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [fetchProducts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default productsSlice.reducer;
export const {setSearch} = productsSlice.actions;