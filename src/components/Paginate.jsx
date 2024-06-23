import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = ({ totalPage, page, handleChangePage }) => {
  return (
    <Pagination>
      {page > 1 && (
        <Pagination.Prev linkClassName="text-dark border-secondary" onClick={() => handleChangePage(page - 1)} />
      )}
      {Array.from({ length: totalPage }, (_, index) => (
        <Pagination.Item linkClassName={+index + 1 === page ? `bg-dark text-light border-secondary` : `text-dark border-secondary`}
          onClick={() => handleChangePage(index + 1)}
          active={+index + 1 === page ? true : false}
          key={`page ${index + 1}`}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      {page < totalPage && (
        <Pagination.Next linkClassName="text-dark border-secondary" onClick={() => handleChangePage(page + 1)} />
      )}
    </Pagination>
  );
};

export default Paginate;
