import React from 'react';
import { useDispatch } from 'react-redux';
import { typeApi } from '../../services/typeService';
import { postSlice } from '../../store/reducers/postSlice';
import './sort.scss';

export const Sort = ({typeId, setTypeId, setTitle}) => {
  const { data: types, isLoading } = typeApi.useFetchTypesQuery();
  const {changePage} = postSlice.actions;
  const dispatch = useDispatch();

  const handlerClick = (type) => {
    setTitle('');
    setTypeId(type.id);
    dispatch(changePage(1)); // при смене типа переход на первую страницу
  }

  return (
    <ul className="sort">
      {types &&
        types.map((type) => 
          <li 
            key={type.id}
            className={type.id === typeId ? 'sort__item active' : 'sort__item'}
            onClick={() => handlerClick(type)}
          >
            {type.name}
          </li>
        )}
    </ul>
  );
};
