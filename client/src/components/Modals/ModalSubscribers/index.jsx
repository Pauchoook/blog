import React from 'react';
import close from '../../../assets/close.svg';
import { subscribeApi } from '../../../services/subscribeService';
import { Link } from 'react-router-dom';
import { USER } from '../../../utils/path';
import '../modal.scss';

export const ModalSubscribers = ({ onHide, ownerId }) => {
  const { data: subscribers } = subscribeApi.useFetchSubscribersQuery(ownerId);

  return (
    <div className="modal">
      <div onClick={onHide} className="modal__overlay">
        <div onClick={(e) => e.stopPropagation()} className="modal__window">
          <button onClick={onHide} className="modal__close">
            <img src={close} alt="" className="modal__close-icon" />
          </button>
          <h3 className="modal__title">Мои подписчики</h3>
          <ul className="modal__list">
            {subscribers &&
              subscribers.map((subscriber) => (
                <li key={subscriber.id} className="modal__item">
                  <Link to={USER + `/${subscriber.user.id}`} className="modal__item-flex">
                    <span className="modal__name">{subscriber.user.nikname}</span>
                  </Link>
                </li>
              ))}
            {(subscribers && subscribers.length === 0) && <p className="modal__content">Список пуст</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};
