import React from "react";

interface IParams {
  setSortOrder: (order: string) => void;
  sortOrder: string;
}

export const Sort = React.memo(({ setSortOrder, sortOrder }: IParams) => {
  return (
    <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
      Toggle sort order name {sortOrder} in table
    </button>
  );
});
