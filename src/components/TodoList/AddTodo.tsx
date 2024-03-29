import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SquareColors } from ".";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Box from "@mui/material/Box";
import React from "react";

interface IAddTodoParams {
  handleSubmit: () => void;
  colorSelectedName: SquareColors;
  newTodo: string;
  handleChangeTodo: (value: string) => void;
}

export const TextFieldCustom = styled(TextField)`
  & .MuiInputBase-input {
    height: 0px;
  }
  & .MuiInputBase-root {
    span {
      position: relative;
      top: 20px;
    }
  }
`;

export const AddTodo = React.memo(
  ({
    handleChangeTodo,
    newTodo,
    handleSubmit,
    colorSelectedName,
  }: IAddTodoParams) => {
    return (
      <Box mb={2}>
        <Typography mt={2} mb={1} variant="h6">
          New Todo
        </Typography>
        <TextFieldCustom
          type="text"
          value={newTodo}
          onChange={(event) => handleChangeTodo(event.target.value)}
        />
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          size="small"
          disabled={
            newTodo === "" || colorSelectedName === SquareColors.Undefined
          }
          onClick={() => {
            handleSubmit();
          }}
        >
          Add Todo
        </Button>
      </Box>
    );
  }
);
