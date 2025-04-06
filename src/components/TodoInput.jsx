import { useState } from 'react';

const TodoInput = ({ handleAdd }) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = () => {
    if (newTask.trim()) {
      handleAdd(newTask);
      setNewTask('');
    }
  };
  return (
    <div className="todo-input-container">
      <input
        type="text"
        placeholder="Go grocery shopping"
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
        value={newTask}
      />
      <button disabled={!newTask.trim()} onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
