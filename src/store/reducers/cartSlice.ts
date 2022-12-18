import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  cart: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload
    },
    incrementCart(state, action) {
      // @ts-ignore тк, работает только, когда есть итем в корзине
      const arrCart = JSON.parse(localStorage.getItem('cart'))
      arrCart.map((i: any) => i.product._id === action.payload ? i.count += 1 : i)
      localStorage.setItem('cart', JSON.stringify(arrCart))
      state.cart.map((item: any) => item.product._id === action.payload ? item.count += 1 : item)
    },
    decrementCart(state, action) {
      // @ts-ignore тк, работает только, когда есть итем в корзине
      const arrCart = JSON.parse(localStorage.getItem('cart'))
      arrCart.map((i: any) => i.product._id === action.payload ? i.count -= 1 : i)
      state.cart.map((item: any) => item.product._id === action.payload ? item.count -= 1 : item)
    },
    removeItem(state, action) {
      state.cart = state.cart.filter((item: any) => item.product._id !== action.payload)
      // @ts-ignore тк, работает только, когда есть итем в корзине
      const arrCart = JSON.parse(localStorage.getItem('cart'))
      localStorage.setItem('cart', JSON.stringify(arrCart.filter((i:any) => i.product._id !== action.payload)))
    }
  }
})
export default cartSlice.reducer
export const {setCart, incrementCart, decrementCart, removeItem} = cartSlice.actions