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
  reducers: {
    addNewPost(state, action: PayloadAction<IPost>) {
      state.posts.unshift(action.payload)
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(p => p._id !== action.payload)
    },
    updatePost(state, action) {
      state.posts = state.posts.map(p => p._id === action.payload._id ?
        action.payload
        :
        p
      )
    },
    setComments(state, action) {
      state.posts.map(p => p._id === action.payload.postID ?
        p.comments = action.payload.comments
        :
        p
      )
    },
    addLike(state, action) {
      state.posts.map(p => {
        return p._id === action.payload.postID
          ? p.likes.push(action.payload.userID) : p
      })
    },
    disLike(state, action) {
      state.posts.map(p => {
        return p._id === action.payload.postID
          ? p.likes = p.likes.filter((l: any) => l !== action.payload.userID) : p
      })
    },
  },
  extraReducers: {
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
      state.isLoading = false;
      state.posts = action.payload.reverse();
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
export const {addLike, disLike, addNewPost, deletePost, updatePost, setComments} = postsSlice.actions;
