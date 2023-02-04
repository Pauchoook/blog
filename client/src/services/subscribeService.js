import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subscribeApi = createApi({
  reducerPath: 'subscribeApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
  tagTypes: ['subscribers', 'owners'],
  endpoints: (build) => ({
    subscribe: build.mutation({
      query: (body) => ({
        url: `/subscriber`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['owners']
    }),
    unubscribe: build.mutation({
      query: (body) => ({
        url: `/owner`,
        method: 'DELETE',
        body
      }),
      invalidatesTags: ['owners']
    }),
    fetchSubscribers: build.query({
      query: (ownerId) => ({
        url: `/subscriber?ownerId=${ownerId}`
      })
    }),
    fetchOwner: build.query({
      query: ({subscriberId, ownerId}) => ({
        url: `/owner/check?subscriberId=${subscriberId}&ownerId=${ownerId}`
      })
    }),
    fetchOwners: build.query({
      query: (subscriberId) => ({
        url: `/owner?subscriberId=${subscriberId}`
      }),
      providesTags: res => ['owners']
    }),
  })
})