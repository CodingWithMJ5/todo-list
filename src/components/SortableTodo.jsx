import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Todo from './Todo';

const SortableTodo = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{ ...style, position: 'relative' }}
    >
      <span className="drag-handle" {...listeners}>
        ⠿
      </span>
      <Todo {...props} />
    </div>
  );
};

export default SortableTodo;
