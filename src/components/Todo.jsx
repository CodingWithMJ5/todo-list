const Todo = ({ todo, handleComplete, handleDelete, handleMove }) => {
  return (
    <div className="todo-item">
      <div className="todo-task">
        <input
          type="checkbox"
          checked={todo.isComplete}
          onChange={() => handleComplete(todo.id)}
        />
        <label
          style={{
            textDecoration: todo.isComplete ? 'line-through' : '',
            opacity: todo.isComplete ? 0.5 : 1,
          }}
        >
          {todo.task}
        </label>
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
