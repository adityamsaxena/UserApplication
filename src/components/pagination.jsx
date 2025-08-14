import React from "react";
import Button from "./button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="Pagination" className="mt-4">
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Button
            className="page-link rounded-pill px-4 py-2 shadow-sm"
            title="« Previous"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </li>

        {/* Page Info */}
        <li className="page-item disabled">
          <span className="page-link rounded-pill px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
        </li>

        {/* Next Button */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <Button
            className="page-link rounded-pill px-4 py-2 shadow-sm"
            title="Next »"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
