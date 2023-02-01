import React from 'react';
import arrow from '../../assets/arrow.svg';
import { Link } from 'react-router-dom';
import { POST } from '../../utils/path';
import './my-post.scss';
import { ModalEditPost } from '../Modals/ModalEditPost';
import { useState } from 'react';

export const MyPost = ({ post }) => {
  const [editPost, setEditPost] = useState(false);

  const date = post.createdAt.slice(0, 10).split('-').reverse().join('.');
  const type = post.type.name;

  const onHideEdit = () => {
    setEditPost(false);
  }

  return (
    <div className="my-post">
      <Link to={POST + `/${post.id}`} className='my-post__link'>
        <img src={'http://localhost:5000/' + post.img} alt="Фотография" className="my-post__img" />
        <div className="my-post__link-circle">
          <img src={arrow} className="my-post__link-arrow" />
        </div>
      </Link>
      <span className="my-post__type"># {type}</span>
      <p className="my-post__title">{post.title}</p>
      <p className="my-post__content">
        {post.body}
      </p>
      <span className="my-post__date">{date}</span>
      <button onClick={() => setEditPost(true)} className="my-post__edit">Редактировать</button>
      {editPost && <ModalEditPost onHide={onHideEdit} post={post} />}
    </div>
  );
};
