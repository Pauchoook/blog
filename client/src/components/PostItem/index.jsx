import React from 'react';
import arrow from '../../assets/arrow.svg';
import './post-item.scss';
import { Link } from 'react-router-dom';
import { POST, USER } from '../../utils/path';

export const PostItem = ({ post }) => {
  const author = post.user;
  const date = post.createdAt.slice(0, 10).split('-').reverse().join('.');
  const avatar = `http://localhost:5000/${author.avatar}`;
  const type = post.type.name;

  return (
    <div className='post-item'>
      <Link to={POST + `/${post.id}`} className="post-item__link">
        <img src={'http://localhost:5000/' + post.img} alt="Фотография" className="post-item__img" />
        <div className="post-item__link-circle">
          <img src={arrow} className="post-item__link-arrow" />
        </div>
      </Link>
      <div className="post-item__body">
        <span className="post-item__type"># {type}</span>
        <p className="post-item__title">{post.title}</p>
        <p className="post-item__content">{post.body}</p>
        <Link to={USER + `/${author.id}`} className="post-item__author">
          <img src={avatar} alt="Аватарка" className="post-item__author-avatar" />
          <div className="post-item__author-info">
            <h5 className="post-item__author-nik">{author.nikname}</h5>
            <span className="post-item__date">{date}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
