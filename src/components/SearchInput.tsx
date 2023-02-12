import React from "react";

interface IParams {
  onSearch: (term: string) => void;
}

export const SearchInput = React.memo(({ onSearch }: IParams) => {
  return (
    <div style={{ marginRight: "20px", marginBottom: "20px" }}>
      <h3>Search on key up</h3>
      <input type="text" onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
});
