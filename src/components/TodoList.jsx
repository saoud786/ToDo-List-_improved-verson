import React from 'react';

const TodoList = ({ todos, onDelete, onEdit, onToggle }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
              onClick={() => {
                const newText = prompt('Edit task:', todo.text);
                if (newText !== null && newText.trim() !== '') {
                  onEdit(todo.id, newText);
                }
              }}
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
      ))}
      
      {todos.length === 0 && (
        <p className="empty-message">No tasks yet</p>
      )}
    </div>
  );
}

export default TodoList;