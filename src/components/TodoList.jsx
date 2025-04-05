import { useState } from 'react';
import TodoInput from './TodoInput';
import Todo from './Todo';

let id = 1;

const sampleTodos = [
  { id: 1, task: 'Watch instagram reels', isComplete: true },
];

const TodoList = () => {
  const [todos, setTodos] = useState(sampleTodos);

  const handleAdd = (newTask) => {
    id += 1;
    setTodos([
      ...todos,
      {
        id,
        task: newTask,
        isComplete: false,
      },
    ]);
  };

  const handleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (editedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== editedTodo.id) {
          return todo;
        }

        return editedTodo;
      })
    );
  };

  const handleMove = (isMovingUp) => {};

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput handleAdd={handleAdd} />
      {todos.map((todo) => (
        <Todo
          todo={todo}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleMove={handleMove}
        />
      ))}
    </div>
  );
};

export default TodoList;
