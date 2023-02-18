import { useCallback, useState } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { AddTodo } from "./AddTodo";
import Stack from "@mui/material/Stack";
import { TodoList } from "./TodoList";
import { TODOS } from "../../constants";
import { ITodos, SquareColorProps, SquareColors } from "../../models";

const SquareColor = styled.button<SquareColorProps>`
  border: ${(props) =>
    props.colorSelected === props.actualColor ? "4px solid blue" : "unset"};
  background: ${(props) => props.actualColor};
  width: 50px;
  height: 50px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 6px;
`;

const squareColorsArray = Object.keys(SquareColors).map(
  (key) => SquareColors[key as keyof typeof SquareColors]
);

export const TodoComponent = () => {
  const [isOpenColorModal, setOpenColorModal] = useState(false);
  const [todos, setTodos] = useState(TODOS);
  const [nextId, setNextId] = useState(todos.length + 1);
  const [newTodo, setNewTodo] = useState("");

  const [colorSelectedName, setColorSelectedName] = useState<SquareColors>(
    SquareColors.Undefined
  );
  const [isNotAllowedColor, setIsNotAllowedColor] = useState<
    undefined | boolean
  >(undefined);

  const handleSubmit = useCallback(() => {
    setTodos([
      ...todos,
      { id: nextId, name: newTodo, color: colorSelectedName },
    ]);
    setNextId((prevTodo) => prevTodo + 1);
    setNewTodo("");
    setColorSelectedName(SquareColors.Undefined);
  }, [newTodo]);

  const handleSetTodos = useCallback((todos: ITodos[]) => {
    setTodos(todos);
  }, []);

  const handleSetTodo = useCallback((todo: string) => {
    setNewTodo(todo);
  }, []);

  function assertNever(value: SquareColors): never {
    setColorSelectedName(SquareColors.Undefined);
    setIsNotAllowedColor(true);
    setOpenColorModal(true);
    throw new Error(`Unexpected value: ${value}`);
  }

  const handleSelectColor = (color: SquareColors) => {
    setIsNotAllowedColor(false);

    switch (color) {
      case "red":
        setColorSelectedName(color);
        setOpenColorModal(true);
        return;
      case "green":
        setColorSelectedName(color);
        setOpenColorModal(true);
        return;
      case "blue":
        setColorSelectedName(color);
        setOpenColorModal(true);
        return;
      default:
        return assertNever(color);
    }
  };

  return (
    <>
      <div>
        <AddTodo
          newTodo={newTodo}
          handleChangeTodo={handleSetTodo}
          handleSubmit={handleSubmit}
          colorSelectedName={colorSelectedName}
        />
        <Typography variant="body1">
          Choose a color, is required to add a TODO
        </Typography>
        <Typography variant="body1">
          *Only allowed red, blue and green
        </Typography>
        <Stack direction={"row"}>
          {squareColorsArray
            .filter((item) => item !== SquareColors.Undefined)
            .map((item) => {
              return (
                <SquareColor
                  key={item}
                  onClick={() => handleSelectColor(item)}
                  colorSelected={colorSelectedName}
                  actualColor={item}
                />
              );
            })}
        </Stack>
      </div>
      <Typography id="dialog-title" mt={1} variant="h6">
        TODO List
      </Typography>
      <TodoList todos={todos} handleSetTodos={handleSetTodos} />
      <Dialog
        open={isOpenColorModal}
        onClose={() => setOpenColorModal(false)}
        aria-labelledby="dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            {isNotAllowedColor
              ? "Color not allowed, please choose another."
              : "Color selected!"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenColorModal(false)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export { SquareColors };
