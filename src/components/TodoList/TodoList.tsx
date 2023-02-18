import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { ITodos } from "../../models";

interface ITodosParams {
  handleSetTodos: (todos: ITodos[]) => void;
  todos: ITodos[];
}

export const TodoList = ({ handleSetTodos, todos }: ITodosParams) => {
  const [isSameIdThatTheOneSelected, setSameIdSelected] = useState(-1);
  const [isUpdatingRightNow, setIsUpdatingRightNow] = useState(false);
  const handleTodoUpdate = (index: number, value: string) => {
    const updatedTodoList = [...todos];
    updatedTodoList[index].name = value;
    handleSetTodos(updatedTodoList);
  };

  const handleRemoveButtonClick = (index: number) => {
    const updatedTodoList = [...todos];
    updatedTodoList.splice(index, 1);
    handleSetTodos(updatedTodoList);
  };

  return (
    <Stack my={2}>
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
              onChange={(event) => handleTodoUpdate(index, event.target.value)}
            />
            {todo.id !== isSameIdThatTheOneSelected && !isUpdatingRightNow && (
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
    </Stack>
  );
};
