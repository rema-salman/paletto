import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, query, submitRequest }) => {
  const handlePageClick = ({ selected }) => {
    console.log(`User requested page number ${selected + 1}, `);
    submitRequest(query, selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      previousLabel="Previous"
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
      containerClassName={`${styles.paginationBttns}`}
      previousLinkClassName={`${styles.previousBttn}`}
      nextLinkClassName={`${styles.nextBttn}`}
      disabledClassName={`${styles.paginationDisabled}`}
      activeClassName={`${styles.paginationActive}`}
    />
  );
};
export default Pagination;
