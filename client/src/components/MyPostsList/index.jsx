import React, { useEffect, useState } from 'react';
import { Pagination } from '../Pagination';
import { postApi } from '../../services/postService';
import { useDispatch, useSelector } from 'react-redux';
import { postSlice } from '../../store/reducers/postSlice';
import { MyPost } from '../MyPost';
import './my-posts-list.scss';
import ContentLoader from 'react-content-loader';
import { PostLoader } from '../PostItem/PostLoader';

export const MyPostsList = ({ title, typeId }) => {
  const { user } = useSelector((state) => state.user);
  const { page, limit } = useSelector((state) => state.post);
  const { changePage } = postSlice.actions;
  const {
    data: posts,
    refetch,
    isLoading,
  } = postApi.useFetchPostsQuery({ page, limit, title, typeId, userId: user.id });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePage(1));
  }, []);

  useEffect(() => {
    refetch();
  }, [page, limit, title, typeId]);

  const handlerChangePage = (page) => {
    dispatch(changePage(page));
  };

  return (
      <>
        {isLoading 
        ?
          <div className="my-posts-list">
            {new Array(6).fill(undefined).map((item, index) => 
              <PostLoader key={index} />
            )}
          </div>
        : 
          <>
            <div className="my-posts-list">
              {posts.rows.map((post) => <MyPost key={post.id} post={post} />)}
            </div>
            <Pagination handlerChangePage={handlerChangePage} totalLength={posts.count} limit={limit} />
          </>
        }
      </>
  );
};
