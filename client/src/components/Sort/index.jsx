import React from 'react';
import { typeApi } from '../../services/typeService';
import './sort.scss';

export const Sort = ({typeId, setTypeId}) => {
  const { data: types, isLoading } = typeApi.useFetchTypesQuery();

  return (
    <ul className="sort">
      {types &&
        types.map((type) => 
          <li 
            key={type.id}
            className={type.id === typeId ? 'sort__item active' : 'sort__item'}
            onClick={() => setTypeId(type.id)}
          >
            {type.name}
          </li>
        )}
    </ul>
  );
};
