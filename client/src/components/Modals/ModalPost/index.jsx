import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postApi } from '../../../services/postService';
import close from '../../../assets/close.svg';
import { typeApi } from '../../../services/typeService';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import '../modal.scss';
import './modal-post.scss';

export const ModalPost = ({ onHide }) => {
  const { user } = useSelector((state) => state.user);
  const [createPost, {}] = postApi.useCreatePostMutation();
  const { data: types } = typeApi.useFetchTypesQuery();
  const [showTypes, setShowTypes] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [type, setType] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const imageRef = useRef();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({mode: 'onChange'});

  const changeFile = (e) => {
    const fr = new FileReader();
    const file = e.target.files[0];

    fr.onload = function () {
      imageRef.current.src = fr.result;
    };

    setIsImg(true);
    fr.readAsDataURL(file);
  };

  const changeForm = (data) => {
    if (isValid) {
      if (!type) {
        console.log('fewfe')
        setTypeError(true);
        return;
      } else {
        setTypeError(false);
      };
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('img', data.file[0]);
      formData.append('body', data.body);
      formData.append('userId', user.id);
      formData.append('typeId', type.id);

      createPost(formData).then((res) => {
        setIsImg(false);
        setType(null);
        onHide();
      });
    }
  };

  const changeType = (type) => {
    setType(type);
    setShowTypes(false);
  };

  return (
    <div className="modal">
      <div onClick={onHide} className="modal__overlay">
        <div onClick={(e) => e.stopPropagation()} className="modal__window">
          <button onClick={onHide} className="modal__close">
            <img src={close} alt="" className="modal__close-icon" />
          </button>
          <h3 className="modal__title">Добавить пост</h3>
          <form onSubmit={handleSubmit(changeForm)} className="modal-post__form">
            <label htmlFor="title" className="auth-form__label">
              {errors?.title && errors?.title.message}
            </label>
            <input
              {...register('title', {
                required: 'Поле не может быть пустым',
                minLength: {
                  value: 5,
                  message: 'Поле должно содержать минимум 5 символов',
                },
              })}
              id="title"
              type="text"
              placeholder="Введите название"
              className="input modal-post__input"
            />
            <label htmlFor="body" className="auth-form__label">
              {errors?.body && errors?.body.message}
            </label>
            <textarea
              {...register('body', {
                required: 'Поле не может быть пустым',
                minLength: {
                  value: 1,
                  message: 'Поле должно содержать минимум 150 символов',
                },
              })}
              id="body"
              placeholder="Описание"
              className="input modal-post__input modal-post__input--descr"
            ></textarea>
            <div className="spoller modal-post__spoller">
              <button
                type="button"
                onClick={() => setShowTypes(!showTypes)}
                className={typeError ? 'modal__btn error' : 'modal__btn'}
              >
                {type?.name || 'Выберите тип'}
              </button>
              <ul className={showTypes ? 'spoller__item open' : 'spoller__item'}>
                {types &&
                  types.map((type) => (
                    <li key={type.id} onClick={() => changeType(type)} className="modal-post__spoller-item">
                      {type.name}
                    </li>
                  ))}
              </ul>
            </div>
            <label htmlFor="file" className="auth-form__label">
              {errors?.file && errors?.file.message}
            </label>
            <input
              {...register('file', {
                required: 'Выберите фото',
                onChange: changeFile
              })}
              type="file"
              id="file"
              className="modal__file"
            />
            <label htmlFor="file" className="modal__file-item">
              {isImg ? (
                <img ref={imageRef} alt="Фото" className="modal__file-img" />
              ) : (
                <svg viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" className="modal__file-icon">
                  <path d="M16.9999 24.7917C18.7708 24.7917 20.2762 24.1721 21.5163 22.933C22.7554 21.6929 23.3749 20.1875 23.3749 18.4167C23.3749 16.6458 22.7554 15.1404 21.5163 13.9003C20.2762 12.6612 18.7708 12.0417 16.9999 12.0417C15.2291 12.0417 13.7236 12.6612 12.4836 13.9003C11.2445 15.1404 10.6249 16.6458 10.6249 18.4167C10.6249 20.1875 11.2445 21.6929 12.4836 22.933C13.7236 24.1721 15.2291 24.7917 16.9999 24.7917ZM5.66659 29.75C4.88742 29.75 4.22064 29.4728 3.66625 28.9184C3.11092 28.3631 2.83325 27.6958 2.83325 26.9167V9.91667C2.83325 9.1375 3.11092 8.47072 3.66625 7.91633C4.22064 7.361 4.88742 7.08333 5.66659 7.08333H10.1291L12.7499 4.25H21.2499L23.8708 7.08333H28.3333C29.1124 7.08333 29.7797 7.361 30.335 7.91633C30.8894 8.47072 31.1666 9.1375 31.1666 9.91667V26.9167C31.1666 27.6958 30.8894 28.3631 30.335 28.9184C29.7797 29.4728 29.1124 29.75 28.3333 29.75H5.66659Z" />
                </svg>
              )}
            </label>
            <div className="modal__nav">
              <button onClick={onHide} type="button" className="modal__btn stroke">
                Отмена
              </button>
              <button type="submit" className="modal__btn">
                Создать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};