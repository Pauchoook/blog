import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/reducers/actionsUser';
import './profile-edit.scss';

export const ProfileEdit = ({ user }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const handlerUpdateUser = (data) => {
    if (isValid) {
      dispatch(updateUser({ ...data, id: user.id }));
    }
  };

  return (
    <form onSubmit={handleSubmit(handlerUpdateUser)} className="profile-edit">
      <div className="profile-edit__body">
        <div className="profile-edit__item profile-edit__item--descr">
          <label htmlFor="about-user" className="profile-edit__label">
            Обо мне
          </label>
          <textarea
            {...register('about', {
              value: user.about,
            })}
            placeholder="Введите описание..."
            type="text"
            id="about-user"
            className="input profile-edit__input profile-edit__input--descr"
          />
        </div>
        <div className="profile-edit__item">
          <label htmlFor="first-name" className="profile-edit__label">
            Имя
          </label>
          <input
            {...register('firstName', {
              value: user.firstName,
            })}
            placeholder="Введите имя..."
            type="text"
            id="first-name"
            className="input profile-edit__input"
          />
        </div>
        <div className="profile-edit__item">
          <label htmlFor="last-name" className="profile-edit__label">
            Фамилия
          </label>
          <input
            {...register('lastName', {
              value: user.lastName,
            })}
            placeholder="Введите фамилию..."
            type="text"
            id="last-name"
            className="input profile-edit__input"
          />
        </div>
        <div className="profile-edit__item">
          <label htmlFor="nikname" className="profile-edit__label">
            Никнейм
          </label>
          <input
            {...register('nikname', {
              value: user.nikname,
              required: 'Поле не может быть пустым',
            })}
            placeholder="Введите никнейм..."
            type="text"
            id="nikname"
            className="input profile-edit__input"
          />
          <label htmlFor="nikname" className="profile-edit__error">
            {errors?.nikname && errors?.nikname.message}
          </label>
        </div>
        <div className="profile-edit__item">
          <label htmlFor="date" className="profile-edit__label">
            Дата рождения
          </label>
          <input
            {...register('date', {
              value: user.date && user.date.slice(0, 10)
            })}
            type='date'
            id="date"
            className="input profile-edit__input"
          />
        </div>
        <div className="profile-edit__item">
          <label htmlFor="city" className="profile-edit__label">
            Мой город
          </label>
          <input
            {...register('city', {
              value: user.city,
            })}
            placeholder="Введите город..."
            type="text"
            id="city"
            className="input profile-edit__input"
          />
        </div>
        <div className="profile-edit__item">
          <label htmlFor="email" className="profile-edit__label">
            Email
          </label>
          <input
            {...register('email', {
              value: user.email,
              required: 'Поле не может быть пустым',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Неккоректный email',
              },
            })}
            placeholder="Введите email..."
            type="email"
            id="email"
            className="input profile-edit__input"
          />
          <label htmlFor="email" className="profile-edit__error">
            {errors?.email && errors?.email.message}
          </label>
        </div>
        <div className="profile-edit__item">
          <label htmlFor="profession" className="profile-edit__label">
            Профессия
          </label>
          <input
            {...register('profession', {
              value: user.profession,
            })}
            placeholder="Введите email..."
            type="profession"
            id="profession"
            className="input profile-edit__input"
          />
        </div>
      </div>
      <button type="submit" className="profile-edit__save">
        Сохранить
      </button>
    </form>
  );
};
