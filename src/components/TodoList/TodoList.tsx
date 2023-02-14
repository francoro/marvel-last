import { useState } from "react";
import styled from "styled-components";

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
`;

export const TodoList = () => {
  const [todos, setTodos] = useState(TODOS);
  const [nextId, setNextId] = useState(todos.length + 1);
  //wanted to clarify the name make sure it's understandable
  const [isSameIdThatTheOneSelected, setSameIdSelected] = useState(-1);
  const [isUpdatingRightNow, setIsUpdatingRightNow] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [colorSelectedName, setColorSelectedName] = useState<SquareColors>(
    SquareColors.Undefined
  );

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
    alert("Color not allowed, please choose another color");
    throw new Error(`Unexpected value: ${value}`);
  }

  const handleSelectColor = (color: SquareColors) => {
    switch (color) {
      case "red":
        setColorSelectedName(color);
        alert("Picked allowed color");
        return;
      case "green":
        setColorSelectedName(color);
        alert("Picked allowed color");
        return;
      case "blue":
        setColorSelectedName(color);
        alert("Picked allowed color");
        return;
      default:
        return assertNever(color);
    }
  };

  return (
    <>
      <h3 style={{}}>TODO List</h3>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          style={{ marginLeft: "10px" }}
          disabled={newTodo === "" || colorSelectedName === undefined}
          onClick={() => {
            handleSubmit();
          }}
        >
          Add Todo
        </button>
        <h3>Choose a color, is required to add TODO</h3>
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
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        {todos.map((todo, index) => {
          return (
            <div key={todo.id} style={{ marginBottom: "5px" }}>
              <input
                type="text"
                disabled={todo.id !== isSameIdThatTheOneSelected}
                value={todo.name}
                onChange={(event) =>
                  handleTodoUpdate(index, event.target.value)
                }
              />
              {todo.id !== isSameIdThatTheOneSelected &&
                !isUpdatingRightNow && (
                  <button
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                    onClick={() => {
                      setIsUpdatingRightNow(true);
                      setSameIdSelected(todo.id);
                    }}
                  >
                    UPDATE
                  </button>
                )}
              {todo.id === isSameIdThatTheOneSelected && (
                <button
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                  onClick={() => {
                    setIsUpdatingRightNow(false);
                    setSameIdSelected(-1);
                  }}
                >
                  SAVE
                </button>
              )}

              <button
                onClick={() => {
                  if (todo.id === isSameIdThatTheOneSelected) {
                    setIsUpdatingRightNow(false);
                  }
                  handleRemoveButtonClick(index);
                }}
              >
                REMOVE
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
