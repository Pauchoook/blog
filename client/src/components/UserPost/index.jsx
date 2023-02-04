import React from 'react';
import { Link } from 'react-router-dom';
import { POST } from '../../utils/path';
import arrow from '../../assets/arrow.svg';
import './user-post.scss';

export const UserPost = ({post}) => {
  const type = post.type.name;
  const date = post.createdAt.slice(0, 10).split('-').reverse().join('.');

  return (
    <div className="user-post">
      <Link to={POST + `/${post.id}`} className="user-post__link">
        <img src={'http://localhost:5000/' + post.img} alt="Фотография" className="user-post__img" />
        <div className="user-post__link-circle">
          <img src={arrow} className="user-post__link-arrow" />
        </div>
      </Link>
      <div className="user-post__body">
        <span className="user-post__type"># {type}</span>
        <p className="user-post__title">{post.title}</p>
        <p className="user-post__content">{post.body}</p>
        <span className="user-post__date">{date}</span>
      </div>
    </div>
  );
};
