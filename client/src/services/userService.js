import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
  endpoints: (build) => ({
    updateAvatar: build.mutation({
      query: (user) => ({
        url: `/user/avatar/${user.id}`,
        method: 'PUT',
        body: user.avatar
      })
    }),
    fetchUser: build.query({
      query: (id) => ({
        url: `/user/${id}`
      })
    }),
    updateUser: build.mutation({
      query: (user) => ({
        url: '/user',
        method: 'PUT',
        body: user
      })
    })
  })
})