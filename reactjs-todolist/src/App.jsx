import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter(() => {
      return todoIndex != index;
    });
    setTodos(newTodoList);
  }

  function handleEditTodos(index) {
    const valueToBeEditted = todos[index];
    setTodoValue(valueToBeEditted);
    handleDeleteTodo(index);
  }

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodos={handleEditTodos}
        handleDeleteTodos={handleDeleteTodo}
        todos={todos}
      />
    </>
  );
}

export default App;
