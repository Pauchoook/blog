import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatarImg from '../../assets/avatar.jpg';
import { ModalPost } from '../../components/Modals/ModalPost';
import { updateAvatar } from '../../store/reducers/actionsUser';
import iconCamera from '../../assets/photo-camera.svg';
import './profile.scss';

export const Profile = () => {
  const [showModalPost, setShowModalPost] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onHideModalPost = () => {
    setShowModalPost(false);
  };

  const onOpenModalPost = () => {
    setShowModalPost(true);
  };

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
            <div className="profile__parent-avatar">
              <img src={avatarImg} alt="Аватарка" className="profile__avatar" />
              <div className="profile__photo-camera">
                <img src={iconCamera} className="profile__photo-camera-img" />
              </div>
            </div>
            <div className="profile__soc-info-right">
              <span className="profile__email">email@mail.ru</span>
              <span className="profile__nik">Pauchok</span>
            </div>
          </div>
          <ul className="profile__nav">
            <li className="profile__nav-item">Мои подписчики</li>
            <li className="profile__nav-item">Мои подписки</li>
            <li className="profile__nav-item">Мои посты</li>
            <li className="profile__nav-item">Добавить пост</li>
          </ul>
        </div>
        {showModalPost && <ModalPost onHide={onHideModalPost} />}
      </div>
    </div>
  );
};
