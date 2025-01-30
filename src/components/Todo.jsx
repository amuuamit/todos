import React, { useState, useEffect } from 'react';
import { MdCheck, MdDeleteForever } from 'react-icons/md';
import './Todo.css';
import TodoForm from './TodoForm';

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState(() => {
    // Load tasks from local storage
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [dateTime, setDateTime] = useState("");

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  // date and time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteTodo = (id) => {
    const updatedTask = task.filter((currTask) => currTask.id !== id);
    setTask(updatedTask);
  };

  const handleClearBtn = () => {
    setTask([]);
  };

  const handleCheckTodo = (id) => {
    const updatedTask = task.map((currTask) => {
      if (currTask.id === id) {
        return { ...currTask, checked: !currTask.checked };
      }
      return currTask;
    });
    setTask(updatedTask);
  };

  return (
    <section className='todo-container'>
      <header>
        <h1>Todo-lists</h1>
        <h4 className='date-time'>{dateTime}</h4>
      </header>
      <TodoForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        task={task}
        setTask={setTask}
      />
      <section className='myUnOrderedList'>
        <ul>
          {task.map((currTask) => (
            <li key={currTask.id} className={`todo-item ${currTask.checked ? 'checked' : ''}`}>
              <span>{currTask.content}</span>
              <button className='check-btn' onClick={() => handleCheckTodo(currTask.id)}>
                {currTask.checked ? <MdCheck /> : <MdCheck style={{ opacity: 0.3 }} />}
              </button>
              <button className='delete-btn' onClick={() => handleDeleteTodo(currTask.id)}>
                <MdDeleteForever />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <button className='clear-btn' onClick={handleClearBtn}>
          Clear All
        </button>
      </section>
    </section>
  );
};

export default Todo;