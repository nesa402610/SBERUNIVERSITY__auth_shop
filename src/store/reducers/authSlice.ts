import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from "../actions/fetchUser";
import {IUser} from "../../types";

interface authSliceProps {
  user: IUser
  isAuth: boolean
  isLoading: boolean
  error: string
  token: null | string
  favProducts: []
}

const initialState: authSliceProps = {
  user: {name: '', email: '', _id: '', about: '', avatar: ''},
  token: null,
  favProducts: [],
  isAuth: false,
  isLoading: false,
  error: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addFavourite(state, action) {
      // @ts-ignore
      state.favProducts.push(action.payload)
      localStorage.setItem('favs', JSON.stringify(state.favProducts))
    },
    setFavourite(state, action){
      state.favProducts = action.payload
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    updateUserData(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.user = action.payload;
    })
      .addCase(fetchUser.pending, (state) => {
      state.isLoading = true;

      })
      .addCase(fetchUser.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Ошибки загрузки данных пользователя'
      })
  }
});

export default authSlice.reducer;
export const {updateUserData, setToken, addFavourite, setFavourite} = authSlice.actions
