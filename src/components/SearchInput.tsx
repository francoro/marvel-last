import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface IParams {
  onSearch: (term: string) => void;
}

export const SearchInput = React.memo(({ onSearch }: IParams) => {
  return (
    <div style={{ marginRight: "20px", marginBottom: "20px" }}>
      <Typography variant="h5" mb={2}>
        Filter by name
      </Typography>
      <TextField
        onChange={(e) => onSearch(e.target.value)}
        label="Filter on key up"
        variant="outlined"
        size="small"
      />
    </div>
  );
});
