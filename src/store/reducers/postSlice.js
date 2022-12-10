import {createSlice} from "@reduxjs/toolkit";
import {fetchPosts} from "../actions/fetchPosts";

const initialState = {
  posts: [],
  isLoading: false,
  error: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [fetchPosts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPosts.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default postsSlice.reducer;
export const {
  fetchPostsPending,
  fetchPostsFulfilled,
  fetchPostsRejected
} = postsSlice.actions;
