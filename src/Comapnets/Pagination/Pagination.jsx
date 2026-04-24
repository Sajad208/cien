import React from "react";
import "./Pagination.css";

export const Pagination = ({ pag, setPag }) => {
  const pageSize = 3;
  const currentPage = Math.floor((pag - pageSize) / pageSize) + 1;
  const totalPages = 165;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setPag(page * pageSize);
  };

  const pages = getPageNumbers();

  return (
    <nav className="pagination-nav" aria-label="Movie pages">
      <div className="pagination-inner">

        <button
          className="pg-btn pg-arrow"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="pg-pages">
          {pages.map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="pg-ellipsis">···</span>
            ) : (
              <button
                key={page}
                className={`pg-btn pg-num ${currentPage === page ? "pg-active" : ""}`}
                onClick={() => goToPage(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className="pg-btn pg-arrow"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      <span className="pg-label">
        صفحة {currentPage} من {totalPages}
      </span>
    </nav>
  );
};

export default Pagination;
