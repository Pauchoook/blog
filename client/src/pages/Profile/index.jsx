import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatar } from '../../store/reducers/actionsUser';
import iconCamera from '../../assets/photo-camera.svg';
import './profile.scss';
import { ProfileNav } from '../../components/ProfileNav';
import { ProfileEdit } from '../../components/ProfileEdit';

export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const avatar = `http://localhost:5000/${user.avatar}`;

  console.log(user);

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
            <input type="file" onChange={changeAvatar} id="avatar" className="profile__input-avatar" />
            <label htmlFor="avatar" className="profile__parent-avatar">
              <img src={avatar} alt="Аватарка" className="profile__avatar" />
              <div className="profile__photo-camera">
                <img src={iconCamera} className="profile__photo-camera-img" />
              </div>
            </label>
            <div className="profile__soc-info-right">
              <span className="profile__nik">{user.nikname}</span>
              <span className="profile__email">{user.email}</span>
            </div>
          </div>
          <ProfileNav user={user} />
        </div>
        <ProfileEdit user={user} />
      </div>
    </div>
  );
};
