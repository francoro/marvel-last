import React from "react";

interface IParams {
  onSearch: (term: string) => void;
}

export const SearchInput = React.memo(({ onSearch }: IParams) => {
  return (
    <>
      <h3>Search</h3>
      <input type="text" onChange={(e) => onSearch(e.target.value)} />
    </>
  );
});
