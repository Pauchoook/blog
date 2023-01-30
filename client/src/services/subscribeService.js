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
    subscribe: build.mutation({
      query: (userId, subscriberId) => ({
        url: `/owner?ownerId=${userId}&subscriberId=${subscriberId}`,
        method: 'DELETE',
      })
    }),
    fetchSubscribers: build.query({
      query: (ownerId) => ({
        url: `/subscriber?ownerId=${ownerId}`
      })
    }),
    fetchOwner: build.query({
      query: (subscriberId) => ({
        url: `/owner/${subscriberId}`
      })
    }),
    fetchOwners: build.query({
      query: (subscriberId) => ({
        url: `/owner?subscriberId=${subscriberId}`
      })
    }),
  })
})