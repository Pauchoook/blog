import React from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../../assets/avatar.jpg';
import { userApi } from '../../services/userService';
import './user.scss';

export const User = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = userApi.useFetchUserQuery(id);
  const avatar = user && `http://localhost:5000/${user.avatar}`;

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="user">
      <div className="container">
        <div className="user__header">
          <div className="user__left">
            <div className="user__left-wrapper">
              <img src={avatar} alt="Аватарка" className="user__avatar" />
              <div className="user__left-info">
                <span className="user__nik">{user.nikname}</span>
                <span className="user__email">{user.email}</span>
              </div>
            </div>
            <ul className="user__list">
              <li className="user__list-item">Подписчики: {user.countSubscribers}</li>
              <li className="user__list-item">Подписки: {user.countOwners}</li>
            </ul>
          </div>
        </div>
        <div className="user__info">
          {user.about && (
            <div className="user__info-item">
              <h3 className="user__info-title">Обо мне</h3>
              <p className="user__info-content">{user.about}</p>
            </div>
          )}
          {user.city && (
            <div className="user__info-item">
              <h3 className="user__info-title">Город</h3>
              <p className="user__info-content">{user.city}</p>
            </div>
          )}
          {user.date && (
            <div className="user__info-item">
              <h3 className="user__info-title">Дата рождения</h3>
              <p className="user__info-content">{user.date}</p>
            </div>
          )}
          {user.firstName && (
            <div className="user__info-item">
              <h3 className="user__info-title">Имя и Фамилия</h3>
              <p className="user__info-content">
                {user.firstName} {user.lastName}
              </p>
            </div>
          )}
          {user.profession && (
            <div className="user__info-item">
              <h3 className="user__info-title">Профессия</h3>
              <p className="user__info-content">{user.profession}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
