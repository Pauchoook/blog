import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import avatarImg from '../../assets/avatar.jpg';
import iconClose from '../../assets/close.svg';
import iconHeart from '../../assets/heart.svg';
import { commentApi } from '../../services/commentService';
import { USER } from '../../utils/path';

export const CommentItem = ({ comment }) => {
  const { user } = useSelector((state) => state.user);
  const author = comment.user;
  const date = comment.createdAt.slice(0, 10).split('-').reverse().join('.');
  const [deleteComment, {}] = commentApi.useDeleteCommentMutation();
  const [likeComment, {}] = commentApi.useLikeCommentMutation();

  const handlerDelete = () => {
    deleteComment(comment.id);
  }

  const handlerLike = () => {
    likeComment({commentId: comment.id, userId: user.id});
  }

  return (
    <div className="comments__item">
      {user.id === author.id && 
        <button onClick={handlerDelete} className="comments__item-close">
          <img src={iconClose} className="comments__icon-close" />
        </button>
      }
      <div className="comments__body">
        <Link to={USER + `/${author.id}`} className="comments__parent-avatar">
          <img src={author.avata ? 'http://localhost:5000/' + author.avatar : avatarImg} className="comments__avatar" />
        </Link>
        <div className="comments__info">
          <Link to={USER + `/${author.id}`} className="comments__author-nik">{author.nikname}</Link>
          <p className="comments__content">{comment.comment}</p>
        </div>
      </div>
      <div className="comments__footer">
        <span className="comments__date">{date}</span>
        <button onClick={handlerLike} className="comments__like">
          <img src={iconHeart} className="comments__icon-like" />
          <span className="comments__count-like">{comment.countLikes}</span>
        </button>
      </div>
    </div>
  );
};
