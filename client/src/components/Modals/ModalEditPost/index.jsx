import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postApi } from '../../../services/postService';
import close from '../../../assets/close.svg';
import { typeApi } from '../../../services/typeService';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import '../modal.scss';

export const ModalEditPost = ({ onHide, post }) => {
  const { user } = useSelector((state) => state.user);
  const { data: types } = typeApi.useFetchTypesQuery();
  const [updatePost, {}] = postApi.useUpdatePostMutation();
  const [showTypes, setShowTypes] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [type, setType] = useState(post.type);
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
        setTypeError(true);
        return;
      } else {
        setTypeError(false);
      };
      const formData = new FormData();

      formData.append('id', post.id);
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('userId', user.id);
      formData.append('typeId', type.id);

      if (data.file[0]) {
        formData.append('img', data.file[0]);
      }

      updatePost(formData).then((res) => {
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
            <img src={close} className="modal__close-icon" />
          </button>
          <h3 className="modal__title">Добавить пост</h3>
          <form onSubmit={handleSubmit(changeForm)} className="modal-post__form">
            <label htmlFor="title" className="auth-form__label">
              {errors?.title && errors?.title.message}
            </label>
            <input
              {...register('title', {
                value: post.title,
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
                value: post.body,
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
                <img src={'http://localhost:5000/' + post.img} alt="Фото" className="modal__file-img" />
              )}
            </label>
            <div className="modal__nav">
              <button onClick={onHide} type="button" className="modal__btn stroke">
                Отмена
              </button>
              <button type="submit" className="modal__btn">
                Редактировать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};