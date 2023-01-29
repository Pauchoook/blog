import React from 'react'
import { useState } from 'react'
import { LoginForm } from '../../components/AuthForm/LoginForm';
import { RegistrationForm } from '../../components/AuthForm/RegistrationForm';
import './auth.scss';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handlerSwitch = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className='auth'>
      <div className="container auth__container">
        <h1 className='auth__title'>{isLogin ? 'Вход' : 'Регистрация'}</h1>
        {isLogin
        ?
          <LoginForm handlerSwitch={handlerSwitch} />
        :
          <RegistrationForm handlerSwitch={handlerSwitch} />
        }
      </div>
    </div>
  )
}
