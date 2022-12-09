import {createSlice} from "@reduxjs/toolkit";
import {fetchUser} from "../actions/fetchUser";

const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserData(state, action) {
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
