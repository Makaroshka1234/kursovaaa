import React, { useState } from 'react';
import '../demos/demos.css';

const ITEMS = [
  'React', 'Angular', 'Vue', 'Svelte',
  'Next.js', 'Nuxt', 'Remix', 'Gatsby',
  'TypeScript', 'JavaScript',
];

const FilterDeclarative: React.FC = () => {
  const [query, setQuery] = useState('');

  // Декларативно: .filter() + рендер масиву
  const filtered = ITEMS.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="demo-filter">
      <input
        className="filter-input"
        placeholder="Пошук фреймворку..."
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul className="filter-list">
        {filtered.map(item => (
          <li key={item} className="filter-item">{item}</li>
        ))}
      </ul>
      <div className="filter-count">
        Знайдено: {filtered.length} з {ITEMS.length}
      </div>
    </div>
  );
};

export default FilterDeclarative;
