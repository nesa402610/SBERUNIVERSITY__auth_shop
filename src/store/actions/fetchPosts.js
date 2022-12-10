import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../APIs/API";

export const fetchPosts = createAsyncThunk(
  'user/fetchPosts',
  async (_, thunkAPI) => {
    const response = await api.getPosts()
    return response.data.posts;
  }
)