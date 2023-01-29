import React from 'react';
import './comment-loader.scss';

export const CommentLoader = () => {
  return (
    <div className="comment-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
