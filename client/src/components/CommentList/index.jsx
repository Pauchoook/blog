import React from 'react';
import { CommentItem } from './CommentItem';
import './comment-list.scss';
import { CommentSend } from './CommentSend';
import { commentApi } from '../../services/commentService';
import { useParams } from 'react-router-dom';
import { CommentLoader } from './CommentLoader';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const CommentList = () => {
  const {id} = useParams();
  const [limit, setLimit] = useState(4);
  const {isAuth, user} = useSelector(state => state.user);
  const {data: comments, isLoading} = commentApi.useFetchCommentsQuery({postId: id, limit});

  const incrementLimit = () => {
    setLimit(limit + 4);
  }

  return (
    <div className="comments">
      {isLoading 
      ?
      <CommentLoader />
      :
      comments.rows.map(comment => 
        <CommentItem key={comment.id} comment={comment} /> 
      )}
      {(!isLoading && comments.count > comments.rows.length) &&
        <button onClick={incrementLimit} className="comments__more">Показать ещё...</button>
      }
      {isAuth && <CommentSend postId={id} userId={user.id} />}
    </div>
  );
};
