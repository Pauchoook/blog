import React from 'react';
import close from '../../../assets/close.svg';
import { subscribeApi } from '../../../services/subscribeService';
import { Link } from 'react-router-dom';
import { USER } from '../../../utils/path';
import '../modal.scss';

export const ModalOwners = ({ onHide, subscriberId }) => {
  const { data: owners } = subscribeApi.useFetchOwnersQuery(subscriberId);

  console.log(owners)

  const onSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <div className="modal">
      <div onClick={onHide} className="modal__overlay">
        <div onClick={(e) => e.stopPropagation()} className="modal__window">
          <button onClick={onHide} className="modal__close">
            <img src={close} alt="" className="modal__close-icon" />
          </button>
          <h3 className="modal__title">Мои подписки</h3>
          <ul className="modal__list">
            {owners &&
              owners.map((owner) => (
                <li key={owner.id} className="modal__item">
                  <Link to={USER + `/${owner.user.id}`} className="modal__item-flex">
                    <span className="modal__name">{owner.user.nikname}</span>
                    <button onClick={onSubscribe} className="modal__btn">
                      Отписаться
                    </button>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};