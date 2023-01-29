import React from 'react';
import { useState } from 'react';
import { typeApi } from '../../services/typeService';
import './sort.scss';

export const Sort = () => {
  const [active, setAcitve] = useState(1);
  const { data: types, isLoading } = typeApi.useFetchTypesQuery();

  return (
    <ul className="sort">
      {types &&
        types.map((type) => 
          <li 
            key={type.id}
            className={type.id === active ? 'sort__item active' : 'sort__item'}
            onClick={() => setAcitve(type.id)}
          >
            {type.name}
          </li>
        )}
    </ul>
  );
};
