import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../store/reducers/actionsUser';
import { MY_POSTS } from '../../utils/path';
import { ModalOwners } from '../Modals/ModalOwners';
import { ModalPost } from '../Modals/ModalPost';
import { ModalSubscribers } from '../Modals/ModalSubscribers';
import './profile-nav.scss';

export const ProfileNav = ({ user }) => {
  const [showModalPost, setShowModalPost] = useState(false);
  const [showModalSubscribers, setShowModalSubscribers] = useState(false);
  const [showModalOwners, setShowModalOwners] = useState(false);
  const dispatch = useDispatch();

  const onHideModalPost = () => {
    setShowModalPost(false);
  };

  const onHideModalSubscribers = () => {
    setShowModalSubscribers(false);
  };

  const onHideModalOwners = () => {
    setShowModalOwners(false);
  };

  const handlerDelete = () => {
    dispatch(deleteUser(user.id));
  };

  return (
    <>
      <ul className="profile__nav">
        <li onClick={() => setShowModalSubscribers(true)} className="profile__nav-item">
          Мои подписчики: {user.countSubscribers}
        </li>
        <li onClick={() => setShowModalOwners(true)} className="profile__nav-item">
          Мои подписки: {user.countOwners}
        </li>
        <li className="profile__nav-item">
          <Link to={MY_POSTS + `/${user.id}`}>Мои посты</Link>
        </li>
        <li onClick={() => setShowModalPost(true)} className="profile__nav-item">
          Добавить пост
        </li>
        <li onClick={handlerDelete} className="profile__nav-item">
          Удалить аккаунт
        </li>
      </ul>
      {showModalPost && <ModalPost onHide={onHideModalPost} />}
      {showModalSubscribers && <ModalSubscribers ownerId={user.id} onHide={onHideModalSubscribers} />}
      {showModalOwners && <ModalOwners subscriberId={user.id} onHide={onHideModalOwners} />}
    </>
  );
};
