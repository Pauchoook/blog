import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Blog } from '../../components/Blog';
import { useObserver } from '../../hooks/useObserver';
import { fetchAll } from '../../store/reducers/actionsPost';
import { postSlice } from '../../store/reducers/postSlice';
import './wall.scss';
import { Sort } from '../../components/Sort';
import { PostList } from '../../components/PostList';

export const Wall = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [title, setTitle] = useState('');
  const observerEl = useRef();
  const dispatch = useDispatch();
  const { clearPosts } = postSlice.actions;

  // useObserver(observerEl, page < count / limit, isLoading, () => setPage(page + 1));

  const handlerSearch = (title) => {
    dispatch(clearPosts());
    dispatch(fetchAll({ page, limit, title }));
  };

  return (
    <div className="wall">
      <div className="container wall__container">
        <Blog handlerSearch={handlerSearch} />
        <Sort />
        <PostList title={title} />
        {/* {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
        <div ref={observerEl} style={{ height: 20 }} /> */}
      </div>
    </div>
  );
};
