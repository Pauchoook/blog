import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import iconSearch from '../../assets/search.svg';
import './main-block.scss';

export const MainBlock = ({ setTitle, title }) => {
  const [value, setValue] = useState('');
  const [isFocus, setFocus] = useState(true);

  useEffect(() => {
    document.addEventListener('keydown', onEnter);
    return () => {
      document.removeEventListener('keydown', onEnter);
    };
  }, [value, isFocus]);

  const onEnter = (e) => {
    if (e.key === 'Enter' && isFocus) handlerClick();
  };

  const handlerClick = () => {
    if (value) {
      setTitle(value);
      setValue('');
    }
  };

  return (
    <div className="main-block">
      <div className="main-block__body">
        <h1 className="main-block__title">{title}</h1>
        <div className="main-block__search">
          <button onClick={handlerClick} className="main-block__search-btn">
            <img src={iconSearch} className="main-block__search-icon" />
          </button>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            type="text"
            placeholder="Поиск"
            className="main-block__search-input"
          />
        </div>
      </div>
    </div>
  );
};
