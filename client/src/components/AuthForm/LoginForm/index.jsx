import React from 'react';
import { useState } from 'react';
import eye from '../../../assets/eye.svg';
import eyeClose from '../../../assets/eye-close.svg';
import { Button } from '../../Button';
import '../auth-form.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/reducers/actionsUser';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { WALL } from '../../../utils/path';
import { useEffect } from 'react';

export const LoginForm = ({ handlerSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const handlerLogin = (data) => {
    if (isValid) {
      dispatch(login(data));
    }
  };

  return (
    <form onSubmit={handleSubmit(handlerLogin)} className="auth-form">
      <label htmlFor="email" className="auth-form__label">
        {errors?.email && errors?.email.message}
      </label>
      <div className="auth-form__item">
        <input
          {...register('email', {
            required: 'Поле не может быть пустым',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Неккоректный email',
            },
          })}
          type="text"
          id="email"
          className="auth-form__input"
          placeholder="Введите email"
        />
      </div>
      <label htmlFor="passowrd" className="auth-form__label">
        {errors?.password && errors?.password.message}
      </label>
      <div className="auth-form__item">
        <input
          {...register('password', {
            required: 'Поле не может быть пустым',
            minLength: {
              value: 6,
              message: 'Пароль должен иметь минимум 6 символов',
            },
          })}
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="auth-form__input"
          placeholder="Введите пароль"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-form__item-btn">
          <img src={showPassword ? eye : eyeClose} alt="Глаз" className="auth-form__icon" />
        </button>
      </div>
      {error && <p className="auth-form__error">{error}</p>}
      <Button className="auth-form__btn" type="submut">
        Вход
      </Button>
      <p className="auth-form__content">
        Нет аккаунта? <span onClick={handlerSwitch}>Регистрация</span>{' '}
      </p>
    </form>
  );
};
