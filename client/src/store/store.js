import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { commentApi } from '../services/commentService';
import { postApi } from '../services/postService';
import { subscribeApi } from '../services/subscribeService';
import { typeApi } from '../services/typeService';
import { userApi } from '../services/userService';
import postSlice from './reducers/postSlice';
import userSlice from './reducers/userSlice';

const rootReducer = combineReducers({
  user: userSlice,
  post: postSlice,
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [subscribeApi.reducerPath]: subscribeApi.reducer,
  [typeApi.reducerPath]: typeApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        postApi.middleware, 
        commentApi.middleware,
        userApi.middleware,
        subscribeApi.middleware,
        typeApi.middleware
      )
  })
}