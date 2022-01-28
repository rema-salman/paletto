import React from "react";
import ReactPaginate from "react-paginate";
import useFBTracker from "../../hooks/useFBTracker";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, query, submitRequest }) => {
  const { addEventToTracker } = useFBTracker();
  const handlePageClick = ({ selected }) => {
    console.log(`User requested page number ${selected + 1}`);
    submitRequest(query, selected + 1);

    addEventToTracker(
      "Search",
      "pagination_page_requested",
      `page_number: ${selected + 1} , search_query: ${query}`
    );
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
