import React from "react";
import Button from "@mui/material/Button";

interface IParams {
  onCount: (times: number) => void;
  times: number;
  render: (times: number) => void;
}

export const Counter = React.memo(({ times, onCount, render }: IParams) => {
  return (
    <>
      <Button
        size="small"
        variant="contained"
        onClick={() => onCount(times + 1)}
      >
        Count
      </Button>
      {render(times)}
    </>
  );
});
