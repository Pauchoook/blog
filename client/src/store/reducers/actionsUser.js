import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../http";
import { AUTH, LOGIN, REGISTRATION } from "../../utils/path";
import jwt_decode from 'jwt-decode';

export const registration = createAsyncThunk(
  'user/registration',
  async (user, thunkAPi) => {
    try {
      const {data} = await $host.post(`/api/user${REGISTRATION}`, user);
      localStorage.setItem('token', data.token)
      return jwt_decode(data.token);
    } catch (e) {
      return thunkAPi.rejectWithValue(e.response.data.message);
    }
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (user, thunkAPi) => {
    try {
      const {data} = await $host.post(`api/user${LOGIN}`, user);
      localStorage.setItem('token', data.token)
      return jwt_decode(data.token);
    } catch (e) {
      return thunkAPi.rejectWithValue(e.response.data.message);
    }
  }
)

export const check = createAsyncThunk(
  'user/check',
  async(_, thunkAPi) => {
    const {data} = await $authHost.get(`api/user${AUTH}`);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
  }
)

export const updateAvatar = createAsyncThunk(
  'user/changeAvatar',
  async(user, thunkApi) => {
    const {data} = await $host.put(`api/user/avatar/${user.id}`, user.avatar);
    localStorage.setItem('token', data.token);
    return data.avatar;
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async(user, thunkApi) => {
    const {data} = await $host.put(`api/user`, user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async(id, thunkAPi) => {
    const {data} = await $host.delete(`api/user/${id}`);
    localStorage.removeItem('token');
    return data;
  }
)