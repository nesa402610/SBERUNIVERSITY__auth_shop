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
    },
    addLike(state, action) {
      state.products.map(p => {
        return p._id === action.payload.id
          ?
          p.likes.push(action.payload.userID)
          :
          p
      })
    },
    disLike(state, action) {
      state.products.map(p => {
        return p._id === action.payload.id
          ?
          p.likes = p.likes.filter((l: any) => l !== action.payload.userID)
          :
          p
      })
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
export const {setSearch, disLike, addLike} = productsSlice.actions;