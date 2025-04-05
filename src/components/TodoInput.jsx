import { useState } from 'react';

const TodoInput = ({ handleAdd }) => {
  const [newTask, setNewTask] = useState('');
  return (
    <div className="todo-input-container">
      <input
        type="text"
        placeholder="Go grocery shopping"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />
      <button
        onClick={() => {
          handleAdd(newTask);
          setNewTask('');
        }}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
