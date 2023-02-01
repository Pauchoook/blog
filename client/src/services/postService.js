import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['posts', 'post'],
  endpoints: (build) => ({
    fetchPosts: build.query({
      query: (q) => ({
        url:
          `/post?page=${q.page}&limit=${q.limit}` +
          (q.title ? `&title=${q.title}` : '') +
          (q.typeId ? `&typeId=${q.typeId}` : '') +
          (q.userId ? `&userId=${q.userId}` : '')
      }),
      providesTags: (res) => ['posts'],
    }),
    fetchPost: build.query({
      query: (id) => ({
        url: `/post/${id}`,
      }),
      providesTags: (res) => ['post'],
    }),
    createPost: build.mutation({
      query: (post) => ({
        url: '/post',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['posts'],
    }),
    likePost: build.mutation({
      query: (body) => ({
        url: `/like/post`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['post'],
    }),
    updatePost: build.mutation({
      query: (post) => ({
        url: `/post`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['posts'],
    }),
  }),
});
