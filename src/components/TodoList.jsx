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

  const handleMove = (id, isMovingUp) => {
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo.id === id);

      const newIndex = isMovingUp ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prevTodos.length) {
        return prevTodos;
      }

      const newTodos = [...prevTodos];
      const [movedItem] = newTodos.splice(index, 1);
      newTodos.splice(newIndex, 0, movedItem);
      return newTodos;
    });
  };

  return (
    <div style={{ width: '400px' }}>
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
