import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MY_POSTS } from '../../utils/path';
import { ModalOwners } from '../Modals/ModalOwners';
import { ModalPost } from '../Modals/ModalPost';
import { ModalUsers } from '../Modals/ModalUsers';
import './profile-nav.scss';

export const ProfileNav = ({user}) => {
  const [showModalPost, setShowModalPost] = useState(false);
  const [showModalUsers, setShowModalUsers] = useState(false);
  const [showModalOwners, setShowModalOweners] = useState(false);

  const onHideModalPost = () => {
    setShowModalPost(false);
  };

  const onHideModalSubscribers = () => {
    setShowModalUsers(false);
  };

  const onHideModalOwners = () => {
    setShowModalOweners(false);
  };

  return (
    <>
      <ul className="profile__nav">
        <li onClick={() => setShowModalUsers(true)} className="profile__nav-item">
          Мои подписчики: {user.countSubscribers}
        </li>
        <li onClick={() => setShowModalOweners(true)} className="profile__nav-item">
          Мои подписки: {user.countOwners}
        </li>
        <li className="profile__nav-item">
          <Link to={MY_POSTS + `/${user.id}`}>Мои посты</Link>
        </li>
        <li onClick={() => setShowModalPost(true)} className="profile__nav-item">
          Добавить пост
        </li>
      </ul>
      {showModalPost && <ModalPost onHide={onHideModalPost} />}
      {showModalUsers && <ModalUsers ownerId={user.id} onHide={onHideModalSubscribers} />}
      {showModalOwners && <ModalOwners subscriberId={user.id} onHide={onHideModalOwners} />}
    </>
  );
};
