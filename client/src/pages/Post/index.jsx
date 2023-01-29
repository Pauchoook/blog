import React from 'react';
import { useParams } from 'react-router-dom';
import { postApi } from '../../services/postService';
import './post.scss';
import { PostInfo } from '../../components/PostInfo';
import { Recommendations } from '../../components/Recommendations';

export const Post = () => {
  const { id } = useParams();
  const { data: post, isLoading } = postApi.useFetchPostQuery(id);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="post">
      <div className="container post__container">
        <PostInfo post={post} />
        <Recommendations type={post.type} />
      </div>
    </div>
  );
};
