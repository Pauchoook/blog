import React from 'react';
import './recommendations.scss';
import { RecommendationsCard } from './RecommendationsCard';

export const Recommendations = () => {
  return (
    <div className="recommendations">
      <h3 className="recommendations__title">Recommendations</h3>
      <RecommendationsCard />
      <RecommendationsCard />
      <RecommendationsCard />
      <RecommendationsCard />
    </div>
  );
};
