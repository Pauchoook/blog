import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatarImg from '../../assets/avatar.jpg';
import { ModalPost } from '../../components/Modals/ModalPost';
import { updateAvatar } from '../../store/reducers/actionsUser';
import iconCamera from '../../assets/photo-camera.svg';
import { ModalSubscribers } from '../../components/Modals/ModalSubscribers';
import './profile.scss';
import { ModalOwners } from '../../components/Modals/ModalOwners';

export const Profile = () => {
  const [showModalPost, setShowModalPost] = useState(false);
  const [showModalSubscribers, setShowModalSubscribers] = useState(false);
  const [showModalOwners, setShowModalOweners] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const avatar = user.avatar ? `http://localhost:5000/${user.avatar}` : avatarImg;

  const onHideModalPost = () => {
    setShowModalPost(false);
  };

  const onHideModalSubscribers = () => {
    setShowModalSubscribers(false);
  }

  const onHideModalOwners = () => {
    setShowModalOweners(false);
  }

  const changeAvatar = (e) => {
    const formData = new FormData();
    const avatar = e.target.files[0];
    formData.append('avatar', avatar);

    const newUser = {
      avatar: formData,
      id: user.id,
    };
    dispatch(updateAvatar(newUser));
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="profile__header">
          <div className="profile__soc-info">
            <input type="file" onChange={changeAvatar} id='avatar' className="profile__input-avatar" />
            <label htmlFor='avatar' className="profile__parent-avatar">
              <img src={avatar} alt="Аватарка" className="profile__avatar" />
              <div className="profile__photo-camera">
                <img src={iconCamera} className="profile__photo-camera-img" />
              </div>
            </label>
            <div className="profile__soc-info-right">
              <span className="profile__email">{user.email}</span>
              <span className="profile__nik">{user.nikname}</span>
            </div>
          </div>
          <ul className="profile__nav">
            <li onClick={() => setShowModalSubscribers(true)} className="profile__nav-item">Мои подписчики: {user.countSubscribers}</li>
            <li onClick={() => setShowModalOweners(true)} className="profile__nav-item">Мои подписки</li>
            <li className="profile__nav-item">Мои посты</li>
            <li onClick={() => setShowModalPost(true)} className="profile__nav-item">Добавить пост</li>
          </ul>
        </div>
        {showModalPost && <ModalPost onHide={onHideModalPost} />}
        {showModalSubscribers && <ModalSubscribers ownerId={user.id} onHide={onHideModalSubscribers} />}
        {showModalOwners && <ModalOwners subscriberId={user.id} onHide={onHideModalOwners} />}
      </div>
    </div>
  );
};
