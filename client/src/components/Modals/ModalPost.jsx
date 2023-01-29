import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postApi } from '../../services/postService';
import { Button } from '../Button';
import close from '../../assets/close.svg';
import './modal.scss';

export const ModalPost = ({ onHide }) => {
  const { user } = useSelector((state) => state.user);
  const [createPost, {}] = postApi.useCreatePostMutation();
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');

  const changeFile = (e) => {
    setImg(e.target.files[0]);
  };

  const changeForm = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('img', img);
    formData.append('body', descr);
    formData.append('userId', user.id);

    createPost(formData).then((res) => {
      setImg(null);
      setDescr('');
      setTitle('');
      onHide();
    });
  };

  return (
    <div className="modal">
      <div className="modal__overlay">
        <div className="modal__window">
          <button onClick={onHide} className="modal__close">
            <img src={close} alt="" className="modal__close-icon" />
          </button>
          <h3 className="modal__title">Добавить пост</h3>
          <form onSubmit={changeForm} className="modal__form">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Введите название"
              className="input modal__input"
            />
            <textarea
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
              className="input modal__input modal__input--descr"
            ></textarea>
            <input onChange={changeFile} type="file" id="post-img" className="modal__file" />
            <label htmlFor="post-img" className="modal__file-item">
              Выберите фото
            </label>
            <Button type="submut" className="modal__form-btn">
              Создать
            </Button>
            <Button type="button" onClick={onHide} className="modal__form-btn red">
              Закрыть
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
