import React from "react";
import styles from "../../styles/common/Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    onPageChange(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className={styles["pagination"]}>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={styles["pagination-btn"]}
      >
        Prev
      </button>

      <span className={styles["page-info"]}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={styles["pagination-btn"]}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
