import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

const ToDoForm = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = taskName.trim();
    if (trimmed) {
      onAdd(trimmed);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Введите новую задачу"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const ToDoItems = ({ tasks, checkedState, onCheckChange }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task, idx) => (
        <li key={task.id} className={checkedState[task.id] ? 'completed' : ''}>
          <label>
            <input
              type="checkbox"
              checked={checkedState[task.id] || false}
              onChange={() => onCheckChange(task.id)}
            />
            {task.name}
          </label>
        </li>
      ))}
    </ul>
  );
};

const FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
};

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [checkedState, setCheckedState] = useState({});
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);

  // добавление новой задачи
  const addTask = (name) => {
    const newTask = {
      id: Date.now().toString(),
      name,
    };
    setTasks(prev => [...prev, newTask]);
    setCheckedState(prev => ({ ...prev, [newTask.id]: false }));
  };

  // отмечаем или снимаем отметку с задачи
  const toggleCheck = (id) => {
    setCheckedState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // обновляем отображаемые задачи согласно checkedState
  const handleSubmit = () => {
    const newSubmitted = tasks.filter(task => checkedState[task.id]);
    setSubmittedTasks(newSubmitted);
  };
  const filteredTasks = tasks.filter(task => {
    if (filter === FILTERS.COMPLETED) return checkedState[task.id];
    if (filter === FILTERS.INCOMPLETE) return !checkedState[task.id];
    return true;
  });

  return (
    <div className="todo-container">
      <h2>ToDo List</h2>

      <ToDoForm onAdd={addTask} />

      <div className="filter-buttons">
        <button
          className={filter === FILTERS.ALL ? 'active' : ''}
          onClick={() => setFilter(FILTERS.ALL)}
        >
          Все
        </button>
        <button
          className={filter === FILTERS.COMPLETED ? 'active' : ''}
          onClick={() => setFilter(FILTERS.COMPLETED)}
        >
          Выполненные
        </button>
        <button
          className={filter === FILTERS.INCOMPLETE ? 'active' : ''}
          onClick={() => setFilter(FILTERS.INCOMPLETE)}
        >
          Невыполненные
        </button>
      </div>

      <ToDoItems tasks={filteredTasks} checkedState={checkedState} onCheckChange={toggleCheck} />

      <button className="submit-btn" onClick={handleSubmit}>Submit</button>

      <div className="submitted-tasks">
        <h3>Список выполненных задач после Submit:</h3>
        {submittedTasks.length === 0 ? (
          <p>Нет выбранных задач.</p>
        ) : (
          <ul>
            {submittedTasks.map(task => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ToDoList;