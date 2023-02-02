import React, { useState } from 'react';
import { MainBlock } from '../../components/MainBlock';
import { MyPostsList } from '../../components/MyPostsList';
import { Sort } from '../../components/Sort';
import './my-posts.scss';

export const MyPosts = () => {
  const [title, setTitle] = useState('');
  const [typeId, setTypeId] = useState(0);

  return (
    <div className="my-posts">
      <div className="container">
        <MainBlock title="Мои посты" setTitle={setTitle} />
        <Sort setTitle={setTitle} typeId={typeId} setTypeId={setTypeId} />
        <MyPostsList title={title} typeId={typeId} />
      </div>
    </div>
  );
};
