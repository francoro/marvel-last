import { useState } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
enum SquareColors {
  Red = "red",
  Green = "green",
  Blue = "blue",
  Purple = "purple",
  Yellow = "yellow",
  Black = "black",
  Grey = "grey",
  Undefined = "undefined",
}

interface ITodos {
  id: number;
  name: string;
  color: SquareColors;
}
const TODOS: ITodos[] = [
  {
    id: 1,
    name: "TODO 1",
    color: SquareColors.Red,
  },
  {
    id: 2,
    name: "TODO 2",
    color: SquareColors.Green,
  },
  {
    id: 3,
    name: "TODO 3",
    color: SquareColors.Blue,
  },
  {
    id: 4,
    name: "TODO 4",
    color: SquareColors.Red,
  },
];

interface SquareColorProps {
  actualColor: string;
  colorSelected: string | undefined;
}

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

export const TodoList = () => {
  const [isOpenColorModal, setOpenColorModal] = useState(false);
  const [todos, setTodos] = useState(TODOS);
  const [nextId, setNextId] = useState(todos.length + 1);
  //wanted to clarify the name make sure it's understandable
  const [isSameIdThatTheOneSelected, setSameIdSelected] = useState(-1);
  const [isUpdatingRightNow, setIsUpdatingRightNow] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [colorSelectedName, setColorSelectedName] = useState<SquareColors>(
    SquareColors.Undefined
  );
  const [isNotAllowedColor, setIsNotAllowedColor] = useState<
    undefined | boolean
  >(undefined);

  //useMemo? or outside component
  const squareColorsArray = Object.keys(SquareColors).map(
    (key) => SquareColors[key as keyof typeof SquareColors]
  );

  const handleSubmit = () => {
    setTodos([
      ...todos,
      { id: nextId, name: newTodo, color: colorSelectedName },
    ]);
    setNextId((prevTodo) => prevTodo + 1);
    setNewTodo("");
    setColorSelectedName(SquareColors.Undefined);
  };

  const handleTodoUpdate = (index: number, value: string) => {
    const updatedTodoList = [...todos];
    updatedTodoList[index].name = value;
    setTodos(updatedTodoList);
  };

  const handleRemoveButtonClick = (index: number) => {
    const updatedTodoList = [...todos];
    updatedTodoList.splice(index, 1);
    setTodos(updatedTodoList);
  };

  function assertNever(value: SquareColors): never {
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
      <Typography mt={2} mb={1} variant="h6">
        New Todo
      </Typography>
      <div>
        <TextField
          sx={{
            ".MuiInputBase-input": {
              height: "0px",
            },
          }}
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          size="small"
          disabled={newTodo === "" || colorSelectedName === undefined}
          onClick={() => {
            handleSubmit();
          }}
        >
          Add Todo
        </Button>
        <h3>Choose a color, is required to add a TODO</h3>
        <h5>*Only allowed red, blue and green</h5>
        <div style={{ display: "flex" }}>
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
        </div>
      </div>
      <Typography id="dialog-title" mt={1} variant="h6">
        TODO List
      </Typography>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        {todos.map((todo, index) => {
          return (
            <div key={todo.id} style={{ marginBottom: "5px" }}>
              <TextField
                sx={{
                  ".MuiInputBase-input": {
                    height: "0px",
                  },
                }}
                disabled={todo.id !== isSameIdThatTheOneSelected}
                value={todo.name}
                onChange={(event) =>
                  handleTodoUpdate(index, event.target.value)
                }
              />
              {todo.id !== isSameIdThatTheOneSelected &&
                !isUpdatingRightNow && (
                  <Button
                    variant="outlined"
                    sx={{ mr: 1, ml: 1 }}
                    onClick={() => {
                      setIsUpdatingRightNow(true);
                      setSameIdSelected(todo.id);
                    }}
                  >
                    <EditIcon />
                  </Button>
                )}
              {todo.id === isSameIdThatTheOneSelected && (
                <Button
                  variant="outlined"
                  sx={{ marginRight: "10px", marginLeft: "10px" }}
                  onClick={() => {
                    setIsUpdatingRightNow(false);
                    setSameIdSelected(-1);
                  }}
                >
                  <SaveIcon />
                </Button>
              )}

              <Button
                variant="outlined"
                sx={{ mr: 1, ml: 1 }}
                onClick={() => {
                  if (todo.id === isSameIdThatTheOneSelected) {
                    setIsUpdatingRightNow(false);
                  }
                  handleRemoveButtonClick(index);
                }}
              >
                <RemoveCircleIcon />
              </Button>
            </div>
          );
        })}
      </div>
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
