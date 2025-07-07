import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <header>
        <h1>My To-Do App</h1>
        <p>Stay organized and productive every day!</p>
      </header>

      <div className="todo-container">
        <h2>Tasks</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add Task</button>

        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? 'completed fade-in' : 'fade-in'}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-text">
        &copy; 2025 Ivan Stefchev. All rights reserved.
      </div>
    </div>
  );
}

export default App;
