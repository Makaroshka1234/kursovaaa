import React, { useState } from 'react';
import '../demos/demos.css';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

let nextId = 1;

const TodoDeclarative: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: nextId++, text: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Декларативно: UI описує стан
  const remaining = todos.filter(t => !t.done).length;

  return (
    <div className="demo-todo">
      <div className="todo-input-row">
        <input
          className="todo-input"
          placeholder="Нова задача..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button className="todo-add-btn" onClick={addTodo}>+</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              className="todo-text"
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                opacity: todo.done ? 0.5 : 1,
              }}
            >
              {todo.text}
            </span>
            <button className="todo-delete" onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <div className="todo-count">
          Залишилось: {remaining} з {todos.length}
        </div>
      )}
    </div>
  );
};

export default TodoDeclarative;
