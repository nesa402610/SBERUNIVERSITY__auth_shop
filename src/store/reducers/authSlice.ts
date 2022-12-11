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
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    [fetchUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default authSlice.reducer;
export const {updateUserData} = authSlice.actions
