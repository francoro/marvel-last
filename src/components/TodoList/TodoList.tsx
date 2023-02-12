import { useState } from "react";

const TODOS = [
  {
    id: 1,
    name: "TODO 1",
  },
  {
    id: 2,
    name: "TODO 2",
  },
  {
    id: 3,
    name: "TODO 3",
  },
  {
    id: 4,
    name: "TODO 4",
  },
];

export const TodoList = () => {
  const [todos, setTodos] = useState(TODOS);
  const [nextId, setNextId] = useState(todos.length + 1);
  //wanted to make sure to clarify the name
  const [isSameIdThatTheOneSelected, setSameIdSelected] = useState(-1);
  const [isUpdatingRightNow, setIsUpdatingRightNow] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = () => {
    setTodos([...todos, { id: nextId, name: newTodo }]);
    setNextId((prevTodo) => prevTodo + 1);
    setNewTodo("");
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

  return (
    <>
      <h3>TODO List</h3>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          style={{ marginLeft: "10px" }}
          disabled={newTodo === ""}
          onClick={() => {
            handleSubmit();
          }}
        >
          Add Todo
        </button>
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
