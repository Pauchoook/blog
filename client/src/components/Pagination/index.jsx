import React from 'react';
import ReactPaginate from 'react-paginate';
import { postSlice } from '../../store/reducers/postSlice';
import './pagination.scss';

export const Pagination = ({totalLength, limit, handlerChangePage}) => {

  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(e) => handlerChangePage(e.selected + 1)}
      pageCount={Math.ceil(totalLength / limit)} // кол-во отображаемых страниц
      previousLabel="<"
    />
  );
};
