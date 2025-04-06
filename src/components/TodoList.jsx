import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import TodoInput from './TodoInput';
import Todo from './Todo';
import SortableTodo from './SortableTodo';

let id = 1;

const sampleTodos = [
  { id: 1, task: 'Watch instagram reels', isComplete: true },
];

const TodoList = () => {
  const [todos, setTodos] = useState(sampleTodos);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setTodos((todos) => {
        const oldIndex = todos.findIndex(({ id }) => id === active.id);
        const newIndex = todos.findIndex(({ id }) => id === over.id);
        return arrayMove(todos, oldIndex, newIndex);
      });
    }
  };

  return (
    <div style={{ width: '400px' }}>
      <h1>Todo List</h1>
      <TodoInput handleAdd={handleAdd} />
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <SortableTodo
              key={todo.id}
              todo={todo}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TodoList;
