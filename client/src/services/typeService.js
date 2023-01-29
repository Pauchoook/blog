import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const typeApi = createApi({
  reducerPath: 'typeApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
  endpoints: (build) => ({
    fetchTypes: build.query({
      query: () => ({
        url: `/type`,
      })
    })
  })
})