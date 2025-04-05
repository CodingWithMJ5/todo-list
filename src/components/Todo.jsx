import { useState } from 'react';

const Todo = ({
  todo,
  handleComplete,
  handleDelete,
  handleEdit,
  handleMove,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleSubmit = () => {
    handleEdit({ ...todo, task: editedTask });
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <div className="todo-task">
        <input
          type="checkbox"
          checked={todo.isComplete}
          onChange={() => handleComplete(todo.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              } else if (e.key === 'Escape') {
                setEditedTask(todo.task);
                setIsEditing(false);
              }
            }}
            autoFocus
            style={{
              fontSize: '16px',
            }}
          />
        ) : (
          <label
            style={{
              textDecoration: todo.isComplete ? 'line-through' : '',
              opacity: todo.isComplete ? 0.5 : 1,
              cursor: 'text',
            }}
            onClick={() => setIsEditing(true)}
          >
            {todo.task.trim() === '' ? 'To-do' : todo.task}
          </label>
        )}
      </div>
      <div className="todo-actions">
        <button onClick={() => handleDelete(todo.id)}>🗑️</button>
        <button onClick={() => handleMove(true)}>⬆️</button>
        <button onClick={() => handleMove(false)}>⬇️</button>
      </div>
    </div>
  );
};

export default Todo;
