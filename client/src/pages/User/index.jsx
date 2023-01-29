import React from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../../assets/avatar.jpg';
import { userApi } from '../../services/userService';
import './user.scss';

export const User = () => {
  const { id } = useParams();
  const { data: user, isLoading, error } = userApi.useFetchUserQuery(id);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="user">
      <div className="container user__container">
        <div className="user__left">
          <img
            src={user.avatar ? `http://localhost:5000/${user.avatar}` : avatar}
            alt="Аватарка"
            className="user__avatar"
          />
          <h1 className="user__nikname">{user.nikname}</h1>
          <p className="user__count-subscribers">{`Подписчики: ${user.countSubscribers}`}</p>
        </div>
        <div className="user__info">
          <ul className="user__info-list">
            <li className="user__info-item">{user.lastName && `Имя: ${user.firstName}`}</li>
            <li className="user__info-item">{user.lastName && `Фамилия: ${user.lastName}`}</li>
            <li className="user__info-item">{user.years && `Лет: ${user.years}`}</li>
          </ul>
          <p className="user__about">{user.about && `О себе: ${user.about}`}</p>
        </div>
      </div>
    </div>
  );
};
