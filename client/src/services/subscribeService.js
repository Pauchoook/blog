import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subscribeApi = createApi({
  reducerPath: 'subscribeApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
  endpoints: (build) => ({
    subscribe: build.mutation({
      query: (user) => ({
        url: `/subscriber`,
        method: 'POST',
        body: user
      })
    }),
    fetchOwner: build.query({
      query: (subscriberId) => ({
        url: `/owner/subscription?subscriberId=${subscriberId}`
      })
    })
  })
})