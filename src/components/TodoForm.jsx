import React from 'react';

const TodoForm = ({ inputValue, setInputValue, task, setTask }) => {
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) return;

    const newTask = { id: Date.now(), content: inputValue, checked: false };

    setTask((prev) => [...prev, newTask]);
    setInputValue("");
  };

  return (
    <section className='form'>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            className='todo-input'
            autoComplete='off'
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type='submit' className='todo-btn'>Add Task</button>
        </div>
      </form>
    </section>
  );
};

export default TodoForm;