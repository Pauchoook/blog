import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  limit: 3
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    }
  }
});

export default postSlice.reducer;