import { createSlice } from '@reduxjs/toolkit';
import { fetchAll } from './actionsPost';

const initialState = {
  isLoading: false,
  error: '',
  posts: [],
  count: 0
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.posts = [...state.posts, ...action.payload.rows];
        state.count = action.payload.count;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export default postSlice.reducer;