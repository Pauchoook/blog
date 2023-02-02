import React from 'react';
import { useState } from 'react';
import { MainBlock } from '../../components/MainBlock';
import './wall.scss';
import { Sort } from '../../components/Sort';
import { PostList } from '../../components/PostList';

export const Wall = () => {
  const [title, setTitle] = useState('');
  const [typeId, setTypeId] = useState(0);

  return (
    <div className="wall">
      <div className="container wall__container">
        <MainBlock title="Все посты" setTitle={setTitle} />
        <Sort setTitle={setTitle} typeId={typeId} setTypeId={setTypeId} />
        <PostList title={title} typeId={typeId} />
      </div>
    </div>
  );
};
