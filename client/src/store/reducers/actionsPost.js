import { createAsyncThunk } from "@reduxjs/toolkit";
import { $host } from "../../http";
import { POST } from "../../utils/path";

export const fetchAll = createAsyncThunk(
  'post/fetchAll',
  async (q, thunkAPi) => {
    try {
      const {data} = await $host.get(`/api${POST}?page=${q.page}&limit=${q.limit}` + (q.title ? `&title=${q.title}` : ''));
      return data;
    } catch (e) {
      return thunkAPi.rejectWithValue(e.response.data.message);
    }
  }
)