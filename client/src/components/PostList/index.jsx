import React, { useEffect } from 'react';
import { PostItem } from '../PostItem';
import './post-list.scss';
import { Pagination } from '../Pagination';
import { postApi } from '../../services/postService';
import { useDispatch, useSelector } from 'react-redux';
import { postSlice } from '../../store/reducers/postSlice';
import { PostLoader } from '../PostItem/PostLoader';

export const PostList = ({ title, typeId }) => {
  const { page, limit } = useSelector((state) => state.post);
  const { data: posts, refetch, isLoading } = postApi.useFetchPostsQuery({ page, limit, title, typeId });
  const { changePage } = postSlice.actions;
  const dispatch = useDispatch();

  const handlerChangePage = (page) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    dispatch(changePage(1));
  }, []);

  useEffect(() => {
    refetch();
  }, [page, limit, title, typeId]);

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
            {posts.rows.map((post) => <PostItem key={post.id} post={post} />)}
          </div>
          <Pagination handlerChangePage={handlerChangePage} totalLength={posts.count} limit={limit} />
        </>
      }
    </>
  );
};
