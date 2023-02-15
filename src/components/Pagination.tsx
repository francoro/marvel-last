import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

interface IParams {
  currentPage: number;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

export const Pagination = React.memo(
  ({ currentPage, handleNextClick, handlePrevClick }: IParams) => {
    return (
      <>
        <Typography variant="h5">Pagination</Typography>
        <Stack my={2} direction="row" alignItems={"center"}>
          <Stack mr={1} direction="row" justifyContent="center">
            <Button
              variant="outlined"
              style={{ marginRight: "10px" }}
              disabled={currentPage === 1}
              onClick={handlePrevClick}
            >
              Prev <Box ml={1}>{currentPage}</Box>
            </Button>
          </Stack>

          <Stack mr={1} direction="row" justifyContent="center">
            <Button variant="outlined" onClick={handleNextClick}>
              Next <Box ml={1}>{currentPage + 1}</Box>
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }
);
