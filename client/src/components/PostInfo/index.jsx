import React from 'react';
import avatarImg from '../../assets/avatar.jpg';
import iconHeart from '../../assets/heart.svg';
import iconComment from '../../assets/comment.svg';
import { Link } from 'react-router-dom';
import './post-info.scss';
import { CommentList } from '../CommentList';
import { useState } from 'react';
import { postApi } from '../../services/postService';
import { useSelector } from 'react-redux';
import { subscribeApi } from '../../services/subscribeService';
import { USER } from '../../utils/path';

export const PostInfo = ({ post }) => {
  const { user } = useSelector((state) => state.user);
  const [showComments, setShowComments] = useState(false);
  const [likePost, {}] = postApi.useLikePostMutation();
  const [subcribe, {}] = subscribeApi.useSubscribeMutation();
  const { data: isSubscription } = subscribeApi.useFetchOwnerQuery(user.id);

  const author = post.user;
  const type = post.type.name;
  const date = post.createdAt.slice(0, 10).split('-').reverse().join('.');
  const avatar = author.avatar ? `http://localhost:5000/${author.avatar}` : avatarImg;
  const image = `http://localhost:5000/${post.img}`;

  const handlerLike = () => {
    likePost({ userId: user.id, postId: post.id });
  };

  const handlerSubscribe = () => {
    subcribe({ userId: user.id, ownerId: author.id });
  };

  return (
    <div className="post-info">
      <span className="post-info__type">{type}</span>
      <h1 className="post-info__title">{post.title}</h1>
      <div className="post-info__header">
        <Link to={USER + `/${author.id}`} className="post-info__user">
          <img src={avatar} alt="Аватарка" className="post-info__user-avatar" />
          <div className="post-info__user-info">
            <h5 className="post-info__user-nik">{author.nikname}</h5>
            <span className="post-info__user-date">{date}</span>
          </div>
        </Link>
        {(!isSubscription && user.id !== author.id) && 
          <button onClick={handlerSubscribe} className="post-info__user-subscribe">
            Подписаться
          </button>
        }
      </div>
      <div className="post-info__parent-img">
        <img src={image} alt="Фотография" className="post-info__img" />
      </div>
      <p className="post-info__content">
        Tips, Tricks, and Strategies for a Winning Experience" is a blog for all gaming enthusiasts. Whether you're a
        beginner or a pro, this blog will provide you with the latest tips, tricks, and strategies to help you level up
        your gaming skills. From PC to console games, we'll cover it all, and provide you with the knowledge you need to
        dominate in the virtual world.
      </p>
      <ul className="post-info__nav">
        <li onClick={handlerLike} className="post-info__nav-item">
          <img src={iconHeart} className="post-info__nav-icon" />
          <span className="post-info__nav-count">{post.countLikes}</span>
        </li>
        <li onClick={() => setShowComments(true)} className="post-info__nav-item">
          <img src={iconComment} className="post-info__nav-icon" />
        </li>
      </ul>
      {showComments && <CommentList />}
    </div>
  );
};
