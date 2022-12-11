import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchPosts} from "../actions/fetchPosts";
import {IPost} from "../../types";

interface postsSliceProps {
  posts: IPost[]
  isLoading: boolean
  error: string
}
const initialState: postsSliceProps = {
  posts: [],
  isLoading: false,
  error: ''
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [fetchPosts.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default postsSlice.reducer;
// export const {} = postsSlice.actions;
