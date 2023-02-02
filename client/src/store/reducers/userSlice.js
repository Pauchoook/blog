import { createSlice } from '@reduxjs/toolkit';
import { registration, login, check, updateAvatar, updateUser } from './actionsUser';

const initialState = {
  isAuth: false,
  user: {},
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.isAuth = true;
        state.error = '';
        state.user = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.error = '';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(check.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user.avatar = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = {...state.user, ...action.payload};
      })
  },
});

export default userSlice.reducer;
