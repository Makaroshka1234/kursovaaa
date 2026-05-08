import React, { useState } from 'react';
import '../demos/demos.css';

const CounterDeclarative: React.FC = () => {
  const [count, setCount] = useState(0);

  // Декларативно: просто описуємо ЩО відображати
  const color = count > 0 ? '#22c55e' : count < 0 ? '#ef4444' : '#f0f0f5';

  return (
    <div className="demo-counter">
      <div
        className="count-display"
        style={{ color }}
      >
        {count}
      </div>
      <div className="counter-buttons">
        <button onClick={() => setCount(c => c - 1)}>−</button>
        <button onClick={() => setCount(0)}>Скинути</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
};

export default CounterDeclarative;
