import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { userSlice } from '../../store/reducers/userSlice';
import { AUTH, PROFILE, WALL } from '../../utils/path';
import './navbar.scss';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const { setAuth, setUser } = userSlice.actions;

  const handlerExit = () => {
    dispatch(setAuth(false));
    dispatch(setUser({}));

    localStorage.removeItem('user');
    navigate(AUTH);
  };

  return (
    <header className="navbar">
      <div className="container navbar__container">
        <Link to={WALL} className="navbar__logo">
          <img src={logo} alt="Логотип" className="navbar__logo-img" />
        </Link>
        {isAuth ? (
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link to={PROFILE} className="navbar__btn">
                Личный кабинет
              </Link>
            </li>
            <li className="navbar__item">
              <button onClick={handlerExit} className="navbar__btn">
                Выйти
              </button>
            </li>
          </ul>
        ) : (
          <Link to={AUTH} className="navbar__btn" onClick={() => navigate(AUTH)}>
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};
