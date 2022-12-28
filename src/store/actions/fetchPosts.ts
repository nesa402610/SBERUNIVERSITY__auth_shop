import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../APIs/API";

export const fetchPosts = createAsyncThunk(
  'fetchPosts',
  async () => {
    const response = await api.getPosts()
    return response.data;
  }
)