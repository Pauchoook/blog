import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
  tagTypes: ['Posts', 'Post'],
  endpoints: (build) => ({
    fetchAll: build.query({
      query: (q) => ({
        url: `/post?page=${q.page}&limit=${q.limit}` + (q.title && `&title=${q.title}`)
      })
    }),
    fetchPost: build.query({
      query: (id) => ({
        url: `/post/${id}`
      }),
      providesTags: res => ['Post']
    }),
    createPost: build.mutation({
      query: (post) => ({
        url: '/post',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Posts']
    }),
    likePost: build.mutation({
      query: (body) => ({
        url: `/like/post`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Post']
    })
  })
})