import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostItem } from '../PostItem';
import { fetchAll } from '../../store/reducers/actionsPost';
import './post-list.scss';
import { postSlice } from '../../store/reducers/postSlice';

export const PostList = ({title, typeId}) => {
  const { posts, isLoading, count } = useSelector((state) => state.post);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const {clearPosts} = postSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPosts());
  }, [title, typeId]);

  useEffect(() => {
    dispatch(fetchAll({ page, limit, title, typeId }));
  }, [page, limit, title, typeId]);

  return (
    <div className="post-list">
      {posts.map(post => 
        <PostItem key={post.id} post={post} />
      )}
    </div>
  );
};