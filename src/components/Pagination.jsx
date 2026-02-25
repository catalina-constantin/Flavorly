import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="pagination-btn"
      >
        Prev
      </button>

      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
