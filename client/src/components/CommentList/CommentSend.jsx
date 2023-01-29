import React from 'react';
import { useState } from 'react';
import avatarImg from '../../assets/avatar.jpg';
import iconSend from '../../assets/send.svg';
import { commentApi } from '../../services/commentService';

export const CommentSend = ({ postId, userId }) => {
  const [value, setValue] = useState('');
  const [createComment, {}] = commentApi.useCreateCommentMutation();

  const handlerCreateComment = () => {
    if (value) {
      const comment = {
        comment: value,
        postId,
        userId,
      };
      createComment(comment);
      setValue('');
    }
  };

  return (
    <div className="comments__send">
      <img src={avatarImg} className="comments__send-avatar" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Написать комментарий..."
        className="input comments__send-input"
      />
      <button onClick={handlerCreateComment} className="comments__send-btn">
        <img src={iconSend} className="comments__icon-send" />
      </button>
    </div>
  );
};
