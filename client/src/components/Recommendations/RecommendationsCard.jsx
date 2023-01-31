import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../../assets/arrow.svg';
import { POST } from '../../utils/path';

export const RecommendationsCard = ({ post }) => {
  const img = `http://localhost:5000/${post.img}`;
  const type = post.type.name;

  return (
    <div className="recommendations__card">
      <Link to={POST + `/${post.id}`} className="recommendations__link">
        <img src={img} alt="Фотография" className="recommendations__img" />
        <div className="recommendations__link-circle">
          <img src={arrow} className="recommendations__link-arrow" />
        </div>
      </Link>
      <span className="recommendations__type"># {type}</span>
      <h4 className="recommendations__card-title">{post.title}</h4>
    </div>
  );
};
