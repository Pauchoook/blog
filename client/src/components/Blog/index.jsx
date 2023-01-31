import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import iconSearch from '../../assets/search.svg';
import './blog.scss';

export const Blog = ({ setTitle }) => {
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
    <div className="blog">
      <div className="blog__body">
        <h1 className="blog__title">Блог</h1>
        <div className="blog__search">
          <button onClick={handlerClick} className="blog__search-btn">
            <img src={iconSearch} className="blog__search-icon" />
          </button>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            type="text"
            placeholder="Поиск"
            className="blog__search-input"
          />
        </div>
      </div>
    </div>
  );
};
