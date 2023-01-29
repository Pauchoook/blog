import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
  tagTypes: ['Comments'],
  endpoints: (build) => ({
    fetchComments: build.query({
      query: (q) => ({
        url: `/comment?postId=${q.postId}&limit=${q.limit}`,
      }),
      providesTags: res => ['Comments']
    }),
    createComment: build.mutation({
      query: (comment) => ({
        url: `/comment`,
        method: 'POST',
        body: comment
      }),
      invalidatesTags: ['Comments']
    }),
    likeComment: build.mutation({
      query: (body) => ({
        url: `/like/comment`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Comments']
    }),
    deleteComment: build.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comments']
    })
  })
})