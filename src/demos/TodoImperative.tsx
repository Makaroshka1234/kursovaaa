import React, { useRef, useCallback, useState } from 'react';
import '../demos/demos.css';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

let nextId = 1;

const TodoImperative: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const todosRef = useRef<Todo[]>([]);
  const [, forceRender] = useState(0);

  const renderList = useCallback(() => {
    const ul = listRef.current;
    const countEl = countRef.current;
    if (!ul || !countEl) return;

    // Імперативно: очищаємо і перебудовуємо DOM вручну
    ul.innerHTML = '';

    for (let i = 0; i < todosRef.current.length; i++) {
      const todo = todosRef.current[i];
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.done ? ' done' : '');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.done;
      checkbox.className = 'todo-checkbox';
      checkbox.addEventListener('change', () => {
        todosRef.current[i].done = checkbox.checked;
        renderList();
      });

      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;
      if (todo.done) {
        span.style.textDecoration = 'line-through';
        span.style.opacity = '0.5';
      }

      const btn = document.createElement('button');
      btn.className = 'todo-delete';
      btn.textContent = '✕';
      btn.addEventListener('click', () => {
        todosRef.current.splice(i, 1);
        renderList();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(btn);
      ul.appendChild(li);
    }

    const remaining = todosRef.current.filter(t => !t.done).length;
    countEl.textContent = `Залишилось: ${remaining} з ${todosRef.current.length}`;
  }, []);

  const handleAdd = () => {
    const input = inputRef.current;
    if (!input || !input.value.trim()) return;

    todosRef.current.push({
      id: nextId++,
      text: input.value.trim(),
      done: false,
    });

    input.value = '';
    renderList();
    forceRender(n => n + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="demo-todo">
      <div className="todo-input-row">
        <input
          ref={inputRef}
          className="todo-input"
          placeholder="Нова задача..."
          onKeyDown={handleKeyDown}
        />
        <button className="todo-add-btn" onClick={handleAdd}>+</button>
      </div>
      <ul ref={listRef} className="todo-list"></ul>
      <div ref={countRef} className="todo-count"></div>
    </div>
  );
};

export default TodoImperative;
