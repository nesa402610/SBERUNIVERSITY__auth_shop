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
    addProduct(state, action) {
      state.products.push(action.payload)
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(p => p._id !== action.payload)
    },
    setSearch(state, action) {
      state.searchText = action.payload
    },
    addReview(state, action) {
      state.products = state.products.filter(p => p._id === action.payload.productID ?
        p.reviews = action.payload.reviews
        :
        p
      )
    },
    removeReview(state, action) {
      state.products = state.products.filter(p => p._id === action.payload.productID ?
        p.reviews = p.reviews.filter(r => r._id !== action.payload.reviewID)
        :
        p
      )
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
export const {setSearch, disLike, addLike, deleteProduct, addProduct, addReview, removeReview} = productsSlice.actions;