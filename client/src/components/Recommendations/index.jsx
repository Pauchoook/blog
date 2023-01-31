import React from 'react';
import { postApi } from '../../services/postService';
import './recommendations.scss';
import { RecommendationsCard } from './RecommendationsCard';

export const Recommendations = ({ type }) => {
  const { data: posts } = postApi.useFetchPostsQuery({ page: 1, limit: 4, typeId: type.id });

  return (
    <div className="recommendations">
      <h3 className="recommendations__title">Рекомендации</h3>
      {posts && posts.rows.map((post) => 
        <RecommendationsCard key={post.id} post={post} />
      )}
    </div>
  );
};
