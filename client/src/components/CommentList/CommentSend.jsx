import React from 'react';
import { useState } from 'react';
import iconSend from '../../assets/send.svg';
import { commentApi } from '../../services/commentService';

export const CommentSend = ({ postId, user }) => {
  const [value, setValue] = useState('');
  const [createComment, {}] = commentApi.useCreateCommentMutation();
  const avatar = 'http://localhost:5000/' + user.avatar;

  const handlerCreateComment = () => {
    if (value) {
      const comment = {
        comment: value,
        postId,
        userId: user.id,
      };
      createComment(comment);
      setValue('');
    }
  };

  return (
    <div className="comments__send">
      <img src={avatar} className="comments__send-avatar" />
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
