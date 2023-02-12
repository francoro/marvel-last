import React from "react";

interface IParams {
  currentPage: number;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

export const Pagination = React.memo(
  ({ currentPage, handleNextClick, handlePrevClick }: IParams) => {
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h3>Pagination</h3>
        <button
          style={{ marginRight: "10px" }}
          disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          Prev
          {currentPage}
        </button>
        <button onClick={handleNextClick}>
          Next
          {currentPage + 1}
        </button>
      </div>
    );
  }
);
