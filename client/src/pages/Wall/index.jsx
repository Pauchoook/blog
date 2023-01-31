import React from 'react';
import { useState } from 'react';
import { Blog } from '../../components/Blog';
import './wall.scss';
import { Sort } from '../../components/Sort';
import { PostList } from '../../components/PostList';

export const Wall = () => {
  const [title, setTitle] = useState('');
  const [typeId, setTypeId] = useState(1);

  return (
    <div className="wall">
      <div className="container wall__container">
        <Blog setTitle={setTitle} />
        <Sort setTitle={setTitle} typeId={typeId} setTypeId={setTypeId} />
        <PostList title={title} typeId={typeId} />
      </div>
    </div>
  );
};
