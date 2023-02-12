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
  const [idEnabledToEdit, setIdEnabledToEdit] = useState(-1);
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
  console.log(todos);
  return (
    <>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Add Todo
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {todos.map((todo, index) => {
          return (
            <div key={todo.id}>
              <input
                type="text"
                disabled={todo.id !== idEnabledToEdit}
                value={todo.name}
                onChange={(event) =>
                  handleTodoUpdate(index, event.target.value)
                }
              />
              {todo.id !== idEnabledToEdit && !isUpdatingRightNow && (
                <button
                  onClick={() => {
                    setIsUpdatingRightNow(true);
                    setIdEnabledToEdit(todo.id);
                  }}
                >
                  UPDATE
                </button>
              )}
              {todo.id === idEnabledToEdit && (
                <button
                  onClick={() => {
                    setIsUpdatingRightNow(false);
                    setIdEnabledToEdit(-1);
                  }}
                >
                  SAVE
                </button>
              )}

              <button
                onClick={() => {
                  if (todo.id === idEnabledToEdit) {
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
