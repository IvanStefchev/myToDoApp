import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Зареждаме задачите от localStorage при първоначален рендер
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState('');

  // Записваме задачите в localStorage при промяна на tasks
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Добавяне на нова задача
  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  // Маркиране/размаркиране на задача
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Изтриване на задача
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Добавяне при натискане на Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="app">
      <header>
        <h1>To-Do App</h1>
      </header>

      <div className="todo-container">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add</button>

        <ul>
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span>{task.text}</span>
              <button onClick={() => deleteTask(task.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <p>© 2025 Ivan Stefchev</p>
      </footer>
    </div>
  );
}

export default App;
