import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  'user/fetchAuth',
  async (_, thunkAPI) => {
    const response = await axios.get('https://api.react-learning.ru/v2/sm8/users/me')
    return response.data;
  }
)