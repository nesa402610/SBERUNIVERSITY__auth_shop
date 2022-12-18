import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICart} from "../../types";

interface cartSliceProps {
  cart: ICart[]
}

const initialState: cartSliceProps = {
  cart: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload
    },
    addItem(state, action: PayloadAction<ICart>) {
      state.cart.push(action.payload)
    },
    incrementCart(state, action: PayloadAction<string>) {
      // @ts-ignore тк, работает только, когда есть итем в корзине
      const arrCart = JSON.parse(localStorage.getItem('cart'))
      arrCart.map((i: ICart) => i.product._id === action.payload ? i.count += 1 : i)
      localStorage.setItem('cart', JSON.stringify(arrCart))
      state.cart.map((item: ICart) => item.product._id === action.payload ? item.count += 1 : item)
    },
    decrementCart(state, action: PayloadAction<string>) {
      // @ts-ignore тк, работает только, когда есть итем в корзине
      const arrCart = JSON.parse(localStorage.getItem('cart'))
      arrCart.map((i: ICart) => i.product._id === action.payload ? i.count -= 1 : i)
      localStorage.setItem('cart', JSON.stringify(arrCart))
      state.cart.map((item: ICart) => item.product._id === action.payload ? item.count -= 1 : item)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item: ICart) => item.product._id !== action.payload)
      // @ts-ignore тк, работает только, когда есть итем в корзине
      const arrCart = JSON.parse(localStorage.getItem('cart'))
      localStorage.setItem('cart', JSON.stringify(arrCart.filter((i: ICart) => i.product._id !== action.payload)))
    }
  }
})
export default cartSlice.reducer
export const {setCart, incrementCart, decrementCart, removeItem, addItem} = cartSlice.actions