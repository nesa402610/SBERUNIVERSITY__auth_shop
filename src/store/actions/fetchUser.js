import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../APIs/API";

export const fetchUser = createAsyncThunk(
  'user/fetchAuth',
  async (_, thunkAPI) => {
    const response = await api.getUserData()
    return response.data;
  }
)