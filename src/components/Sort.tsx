import React from "react";
import Button from "@mui/material/Button";

interface IParams {
  setSortOrder: (order: string) => void;
  sortOrder: string;
}

export const Sort = React.memo(({ setSortOrder, sortOrder }: IParams) => {
  return (
    <Button
      size="small"
      variant="contained"
      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
    >
      Toggle sort order name {sortOrder} in table
    </Button>
  );
});
