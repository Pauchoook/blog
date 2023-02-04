import React from 'react';
import close from '../../../assets/close.svg';
import { subscribeApi } from '../../../services/subscribeService';
import { Link } from 'react-router-dom';
import { USER } from '../../../utils/path';
import '../modal.scss';

export const ModalOwnersCheck = ({ onHide, subscriberId, nikname }) => {
  const { data: owners } = subscribeApi.useFetchOwnersQuery(subscriberId);

  return (
    <div className="modal">
      <div onClick={onHide} className="modal__overlay">
        <div onClick={(e) => e.stopPropagation()} className="modal__window">
          <button onClick={onHide} className="modal__close">
            <img src={close} className="modal__close-icon" />
          </button>
          <h3 className="modal__title">Подписки "{nikname}"</h3>
          <ul className="modal__list">
            {owners &&
              owners.map((owner) => (
                <li key={owner.id} className="modal__item">
                  <Link onClick={onHide} to={USER + `/${owner.user.id}`} className="modal__item-flex">
                    <span className="modal__name">{owner.user.nikname}</span>
                  </Link>
                </li>
              ))}
            {(owners && owners.length === 0) && <p className="modal__content">Список пуст</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};
