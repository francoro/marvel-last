import TableSortLabel from "@mui/material/TableSortLabel";
import React from "react";

export interface IParamsSortTableHeader {
  onSort: (sort: "asc" | "desc" | undefined) => void;
  sortOrder: "asc" | "desc" | undefined;
}

export const SortTableHeader = React.memo(
  ({ onSort, sortOrder }: IParamsSortTableHeader) => {
    return (
      <TableSortLabel
        direction={sortOrder}
        onClick={() => onSort(sortOrder === "asc" ? "desc" : "asc")}
      >
        Name
      </TableSortLabel>
    );
  }
);
