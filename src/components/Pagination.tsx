import React from "react";

interface IParams {
  currentPage: number;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

export const Pagination = React.memo(
  ({ currentPage, handleNextClick, handlePrevClick }: IParams) => {
    return (
      <>
        <button disabled={currentPage === 1} onClick={handlePrevClick}>
          Prev
          {currentPage}
        </button>
        <button onClick={handleNextClick}>
          Next
          {currentPage + 1}
        </button>
      </>
    );
  }
);
