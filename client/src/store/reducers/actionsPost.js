import { createAsyncThunk } from "@reduxjs/toolkit";
import { $host } from "../../http";
import { POST } from "../../utils/path";

export const fetchAll = createAsyncThunk(
  'post/fetchAll',
  async (q, thunkAPi) => {
    try {
      const query = `/api${POST}?page=${q.page}&limit=${q.limit}&typeId=${q.typeId}` + (q.title ? `&title=${q.title}` : '');
      const {data} = await $host.get(query);
      return data;
    } catch (e) {
      return thunkAPi.rejectWithValue(e.response.data.message);
    }
  }
)