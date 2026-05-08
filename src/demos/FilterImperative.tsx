import React, { useRef, useEffect, useCallback } from 'react';
import '../demos/demos.css';

const ITEMS = [
  'React', 'Angular', 'Vue', 'Svelte',
  'Next.js', 'Nuxt', 'Remix', 'Gatsby',
  'TypeScript', 'JavaScript',
];

const FilterImperative: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  const renderList = useCallback((filter: string) => {
    // Імперативно: цикл for, push, ручне перебудування DOM
    const ul = listRef.current;
    const countEl = countRef.current;
    if (!ul || !countEl) return;

    // Очищаємо список вручну
    ul.innerHTML = '';

    const filtered: string[] = [];
    for (let i = 0; i < ITEMS.length; i++) {
      if (ITEMS[i].toLowerCase().includes(filter.toLowerCase())) {
        filtered.push(ITEMS[i]);
      }
    }

    // Створюємо елементи DOM вручну
    for (let i = 0; i < filtered.length; i++) {
      const li = document.createElement('li');
      li.className = 'filter-item';
      li.textContent = filtered[i];
      ul.appendChild(li);
    }

    countEl.textContent = `Знайдено: ${filtered.length} з ${ITEMS.length}`;
  }, []);

  useEffect(() => {
    renderList('');

    const input = inputRef.current;
    if (input) {
      const handler = () => renderList(input.value);
      input.addEventListener('input', handler);
      return () => input.removeEventListener('input', handler);
    }
  }, [renderList]);

  return (
    <div className="demo-filter">
      <input
        ref={inputRef}
        className="filter-input"
        placeholder="Пошук фреймворку..."
        type="text"
      />
      <ul ref={listRef} className="filter-list"></ul>
      <div ref={countRef} className="filter-count"></div>
    </div>
  );
};

export default FilterImperative;
