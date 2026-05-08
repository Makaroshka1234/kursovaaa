import React, { useRef, useEffect, useCallback } from 'react';
import '../demos/demos.css';

const CounterImperative: React.FC = () => {
  const displayRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(0);

  const updateDisplay = useCallback(() => {
    // Імперативно: вручну знаходимо елемент і оновлюємо його
    const el = displayRef.current;
    if (el) {
      el.textContent = String(countRef.current);
      el.style.color = countRef.current > 0
        ? '#22c55e'
        : countRef.current < 0
          ? '#ef4444'
          : '#f0f0f5';
      // Анімація
      el.classList.add('bump');
      setTimeout(() => el.classList.remove('bump'), 150);
    }
  }, []);

  useEffect(() => {
    updateDisplay();
  }, [updateDisplay]);

  const handleIncrement = () => {
    countRef.current += 1;
    updateDisplay();
  };

  const handleDecrement = () => {
    countRef.current -= 1;
    updateDisplay();
  };

  const handleReset = () => {
    countRef.current = 0;
    updateDisplay();
  };

  return (
    <div className="demo-counter">
      <div className="count-display" ref={displayRef}>0</div>
      <div className="counter-buttons">
        <button onClick={handleDecrement}>−</button>
        <button onClick={handleReset}>Скинути</button>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

export default CounterImperative;
