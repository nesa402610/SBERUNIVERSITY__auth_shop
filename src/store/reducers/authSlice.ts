import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from "../actions/fetchUser";
import {IUser} from "../../types";

interface authSliceProps {
  user: IUser
  isAuth: boolean
  isLoading: boolean
  error: string
}

const initialState: authSliceProps = {
  user: {name: '', email: '', _id: '', about: '', avatar: ''},
  isAuth: false,
  isLoading: false,
  error: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
export const {updateUserData} = authSlice.actions
