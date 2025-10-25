import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([...todos, { 
        id: Date.now(),
        text: inputText, 
        completed: false 
      }]);
      setInputText('');
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Todo List</h1>
        
        <div className="input-container">
          <input
            type="text"
            className="todo-input"
            placeholder="Add a new task..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>
        
        <div className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onToggle={toggleComplete}
            />
          ))}
          
          {todos.length === 0 && (
            <p className="empty-message">No tasks yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

const TodoItem = ({ todo, onDelete, onEdit, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  }

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus
        />
        <button className="btn save-btn" onClick={handleSave}>Save</button>
        <button className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="checkbox"
      />
      
      <span className="todo-text">{todo.text}</span>
      
      <div className="actions">
        <button 
          className="btn edit-btn"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button 
          className="btn delete-btn"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;