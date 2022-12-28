import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "../../types";
import {fetchPosts} from "../actions/fetchPosts";

interface postsSliceProps {
  posts: IPost[]
  isLoading: boolean
  error: string
}

const initialState: postsSliceProps = {
  posts: [],
  isLoading: true,
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
        action.payload : p
      )
    },
    setComments(state, action) {
      state.posts.map(p => p._id === action.payload.postID ?
        p.comments = action.payload.comments : p
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
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.reverse();

    })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки списка постов';
      })
  }
});
export default postsSlice.reducer;
export const {addLike, disLike, addNewPost, deletePost, updatePost, setComments} = postsSlice.actions;
