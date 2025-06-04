import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <ul className="pagination mb-5 mb-lg-0">
      <li className={`page-item page-prev ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          tabIndex={currentPage === 1 ? -1 : 0}
          disabled={currentPage === 1}
        >
          Prev
        </button>
      </li>

      {Array.from({ length: totalPages }, (_, i) => (
        <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
          <button className="page-link" onClick={() => onPageChange(i + 1)}>
            {i + 1}
          </button>
        </li>
      ))}

      <li className={`page-item page-next ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
          tabIndex={currentPage === totalPages ? -1 : 0}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;