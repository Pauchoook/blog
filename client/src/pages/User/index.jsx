import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { subscribeApi } from '../../services/subscribeService';
import { userApi } from '../../services/userService';
import { ModalSubscribers } from '../../components/Modals/ModalSubscribers';
import { useState } from 'react';
import { ModalOwnersCheck } from '../../components/Modals/ModalOwnersCheck';
import { UserPosts } from '../../components/UserPosts';
import './user.scss';

export const User = () => {
  const { user, isAuth } = useSelector((state) => state.user);
  const { id } = useParams();
  const [subsribe, {}] = subscribeApi.useSubscribeMutation();
  const { data: isSubscription } = subscribeApi.useFetchOwnerQuery({ subscriberId: user.id, ownerId: id });
  const { data: owner, isLoading } = userApi.useFetchUserQuery(id);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [showOwners, setShowOwners] = useState(false);
  const avatar = owner && `http://localhost:5000/${owner.avatar}`;
  const date = owner && owner.date && owner.date.slice(0, 10).split('-').reverse().join('.');

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const onHideSubscribers = () => {
    setShowSubscribers(false);
  };

  const onHideOwners = () => {
    setShowOwners(false);
  };

  const handlerSubscribe = () => {
    subsribe({ userId: user.id, ownerId: id });
  };

  return (
    <div className="user">
      <div className="container">
        <div className="user__header">
          <div className="user__left">
            <div className="user__left-wrapper">
              <div className="user__parent-avatar">
                <img src={avatar} alt="Аватарка" className="user__avatar" />
                {isAuth && user.id !== +id && (
                  <button onClick={handlerSubscribe} disabled={false} className="user__subscribe">
                    {isSubscription ? 'Вы подписаны' : 'Подписаться'}
                  </button>
                )}
              </div>
              <div className="user__left-info">
                <span className="user__nik">{owner.nikname}</span>
                <span className="user__email">{owner.email}</span>
              </div>
            </div>
            <ul className="user__list">
              <li onClick={() => setShowSubscribers(true)} className="user__list-item">
                Подписчики: {owner.countSubscribers}
              </li>
              <li onClick={() => setShowOwners(true)} className="user__list-item">Подписки: {owner.countOwners}</li>
            </ul>
          </div>
        </div>
        <div className="user__info">
          {owner.about && (
            <div className="user__info-item">
              <h3 className="user__info-title">Обо мне</h3>
              <p className="user__info-content">{owner.about}</p>
            </div>
          )}
          {owner.city && (
            <div className="user__info-item">
              <h3 className="user__info-title">Город</h3>
              <p className="user__info-content">{owner.city}</p>
            </div>
          )}
          {owner.date && (
            <div className="user__info-item">
              <h3 className="user__info-title">Дата рождения</h3>
              <p className="user__info-content">{date}</p>
            </div>
          )}
          {owner.firstName && (
            <div className="user__info-item">
              <h3 className="user__info-title">Имя и Фамилия</h3>
              <p className="user__info-content">
                {owner.firstName} {owner.lastName}
              </p>
            </div>
          )}
          {owner.profession && (
            <div className="user__info-item">
              <h3 className="user__info-title">Профессия</h3>
              <p className="user__info-content">{owner.profession}</p>
            </div>
          )}
        </div>
        <UserPosts userId={id} />
      </div>
      {showSubscribers && <ModalSubscribers onHide={onHideSubscribers} ownerId={id} nikname={owner.nikname} />}
      {showOwners && <ModalOwnersCheck onHide={onHideOwners} subscriberId={id} nikname={owner.nikname} />}
    </div>
  );
};
