import React from 'react';
import TaskCard from '../components/TaskCard';
import CounterImperative from '../demos/CounterImperative';
import CounterDeclarative from '../demos/CounterDeclarative';
import FilterImperative from '../demos/FilterImperative';
import FilterDeclarative from '../demos/FilterDeclarative';
import FormImperative from '../demos/FormImperative';
import FormDeclarative from '../demos/FormDeclarative';
import TodoImperative from '../demos/TodoImperative';
import TodoDeclarative from '../demos/TodoDeclarative';
import './TasksPage.css';

const COUNTER_IMPERATIVE_CODE = `// Імперативний підхід: ручне оновлення DOM
function Counter() {
  const displayRef = useRef(null);
  const countRef = useRef(0);

  const updateDisplay = () => {
    const el = displayRef.current;
    if (el) {
      el.textContent = String(countRef.current);
      el.style.color = countRef.current > 0
        ? '#22c55e'
        : countRef.current < 0
          ? '#ef4444' : '#f0f0f5';
    }
  };

  useEffect(() => { updateDisplay(); }, []);

  const increment = () => {
    countRef.current += 1;
    updateDisplay(); // Вручну оновлюємо!
  };

  return (
    <div>
      <div ref={displayRef}>0</div>
      <button onClick={increment}>+</button>
    </div>
  );
}`;

const COUNTER_DECLARATIVE_CODE = `// Декларативний підхід: стан → UI
function Counter() {
  const [count, setCount] = useState(0);

  // Колір визначається станом
  const color = count > 0 ? '#22c55e'
    : count < 0 ? '#ef4444' : '#f0f0f5';

  return (
    <div>
      <div style={{ color }}>{count}</div>
      <button onClick={() => setCount(c => c + 1)}>
        +
      </button>
    </div>
  );
}`;

const FILTER_IMPERATIVE_CODE = `// Імперативний підхід: ручне перебудування DOM
function Filter() {
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const renderList = (filter) => {
    const ul = listRef.current;
    ul.innerHTML = ''; // Очищаємо DOM

    const filtered = [];
    for (let i = 0; i < ITEMS.length; i++) {
      if (ITEMS[i].toLowerCase()
          .includes(filter.toLowerCase())) {
        filtered.push(ITEMS[i]);
      }
    }

    for (let i = 0; i < filtered.length; i++) {
      const li = document.createElement('li');
      li.textContent = filtered[i];
      ul.appendChild(li); // Вручну додаємо
    }
  };

  useEffect(() => {
    renderList('');
    const input = inputRef.current;
    input.addEventListener('input', () =>
      renderList(input.value)
    );
  }, []);

  return (
    <div>
      <input ref={inputRef} />
      <ul ref={listRef}></ul>
    </div>
  );
}`;

const FILTER_DECLARATIVE_CODE = `// Декларативний підхід: .filter() + .map()
function Filter() {
  const [query, setQuery] = useState('');

  // Фільтрація — чиста функція
  const filtered = ITEMS.filter(item =>
    item.toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {filtered.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`;

const FORM_IMPERATIVE_CODE = `// Імперативний підхід: ручна валідація
function Form() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const nameErrRef = useRef(null);

  const validate = () => {
    let valid = true;
    const nameInput = nameRef.current;
    const nameErr = nameErrRef.current;

    if (nameInput.value.trim().length < 2) {
      nameInput.className = 'input error';
      nameErr.textContent = 'Мін. 2 символи';
      nameErr.style.display = 'block';
      valid = false;
    } else {
      nameInput.className = 'input success';
      nameErr.style.display = 'none';
    }
    // ... те саме для email
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) { /* відправити */ }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} />
      <div ref={nameErrRef}></div>
      <button type="submit">OK</button>
    </form>
  );
}`;

const FORM_DECLARATIVE_CODE = `// Декларативний підхід: контрольовані інпути
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (name.trim().length < 2)
      errs.name = 'Мін. 2 символи';
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))
      errs.email = 'Невірний email';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (!Object.keys(errs).length) {
      /* відправити */
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        className={errors.name ? 'error' : ''}
      />
      {errors.name && <span>{errors.name}</span>}
      <button type="submit">OK</button>
    </form>
  );
}`;

const TODO_IMPERATIVE_CODE = `// Імперативний підхід: ручне створення DOM
function TodoList() {
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const todosRef = useRef([]);

  const renderList = () => {
    const ul = listRef.current;
    ul.innerHTML = ''; // Очищаємо весь DOM

    for (let i = 0; i < todosRef.current.length; i++) {
      const todo = todosRef.current[i];
      const li = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.done;
      checkbox.addEventListener('change', () => {
        todosRef.current[i].done = checkbox.checked;
        renderList(); // Перемальовуємо все!
      });

      const span = document.createElement('span');
      span.textContent = todo.text;
      if (todo.done) {
        span.style.textDecoration = 'line-through';
      }

      const btn = document.createElement('button');
      btn.textContent = '✕';
      btn.addEventListener('click', () => {
        todosRef.current.splice(i, 1);
        renderList();
      });

      li.append(checkbox, span, btn);
      ul.appendChild(li);
    }
  };

  const handleAdd = () => {
    const val = inputRef.current.value.trim();
    if (!val) return;
    todosRef.current.push({
      id: Date.now(), text: val, done: false
    });
    inputRef.current.value = '';
    renderList();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleAdd}>+</button>
      <ul ref={listRef}></ul>
    </div>
  );
}`;

const TODO_DECLARATIVE_CODE = `// Декларативний підхід: стан → UI
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev,
      { id: Date.now(), text: input, done: false }
    ]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={addTodo}>+</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() =>
              deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

const TasksPage: React.FC = () => {
  return (
    <main className="tasks-page" id="tasks-page">
      <div className="container">
        <header className="tasks-header">
          <h1 className="tasks-title animate-fade-in-up">
            <span className="gradient-text">Практичні задачі</span>
          </h1>
          <p className="tasks-subtitle animate-fade-in-up delay-1">
            Порівняйте імперативний і декларативний підходи на реальних прикладах 
            з живими демонстраціями
          </p>
        </header>

        <div className="tasks-list">
          <TaskCard
            number={1}
            title="Лічильник"
            description="Класична задача: збільшити/зменшити число і оновити UI"
            imperativeCode={COUNTER_IMPERATIVE_CODE}
            declarativeCode={COUNTER_DECLARATIVE_CODE}
            imperativeDemo={<CounterImperative />}
            declarativeDemo={<CounterDeclarative />}
            metrics={[
              { icon: '📏', label: 'Рядків коду', imperative: '28 рядків', declarative: '14 рядків', winner: 'declarative' },
              { icon: '🔧', label: 'DOM операцій', imperative: 'Ручне: textContent, style.color, classList', declarative: 'Автоматичне через Virtual DOM', winner: 'declarative' },
              { icon: '📖', label: 'Читабельність', imperative: 'Треба відстежувати ref і ручні оновлення', declarative: 'Стан → UI: очевидний потік даних', winner: 'declarative' },
              { icon: '🧠', label: 'Керування станом', imperative: 'useRef — стан поза React, не тригерить ре-рендер', declarative: 'useState — React автоматично синхронізує UI', winner: 'declarative' },
              { icon: '🧪', label: 'Тестованість', imperative: 'Потрібно мокати DOM елементи', declarative: 'Тестуємо стан і рендер напряму', winner: 'declarative' },
            ]}
          />

          <TaskCard
            number={2}
            title="Фільтрація списку"
            description="Пошук по масиву з динамічним оновленням результатів"
            imperativeCode={FILTER_IMPERATIVE_CODE}
            declarativeCode={FILTER_DECLARATIVE_CODE}
            imperativeDemo={<FilterImperative />}
            declarativeDemo={<FilterDeclarative />}
            metrics={[
              { icon: '📏', label: 'Рядків коду', imperative: '35 рядків', declarative: '18 рядків', winner: 'declarative' },
              { icon: '🔧', label: 'DOM операцій', imperative: 'innerHTML = "", createElement, appendChild у циклі', declarative: 'Жодних — React сам оновлює список', winner: 'declarative' },
              { icon: '🔄', label: 'Побічні ефекти', imperative: 'addEventListener вручну + очистка в useEffect', declarative: 'Відсутні — onChange через React', winner: 'declarative' },
              { icon: '📖', label: 'Читабельність', imperative: 'Цикл for + ручне створення елементів', declarative: '.filter().map() — декларативний ланцюг', winner: 'declarative' },
              { icon: '♻️', label: 'Перевикористання', imperative: 'Жорстко привʼязано до DOM-структури', declarative: 'Легко виділити в окремий компонент', winner: 'declarative' },
              { icon: '⚡', label: 'Продуктивність', imperative: 'Перемальовує ВЕСЬ список при кожній зміні', declarative: 'React оновлює лише змінені елементи', winner: 'declarative' },
            ]}
          />

          <TaskCard
            number={3}
            title="Форма з валідацією"
            description="Перевірка полів, показ помилок, стан відправки"
            imperativeCode={FORM_IMPERATIVE_CODE}
            declarativeCode={FORM_DECLARATIVE_CODE}
            imperativeDemo={<FormImperative />}
            declarativeDemo={<FormDeclarative />}
            metrics={[
              { icon: '📏', label: 'Рядків коду', imperative: '42 рядки', declarative: '28 рядків', winner: 'declarative' },
              { icon: '🔧', label: 'DOM маніпуляції', imperative: 'className = "...", style.display, textContent', declarative: 'Класи та текст визначаються станом', winner: 'declarative' },
              { icon: '✅', label: 'Валідація', imperative: 'Перевірка через DOM-значення + ручне оновлення', declarative: 'Чиста функція validate() зі стану', winner: 'declarative' },
              { icon: '📖', label: 'Читабельність', imperative: 'Змішані відповідальності: логіка + DOM', declarative: 'Чіткий поділ: стан, валідація, рендер', winner: 'declarative' },
              { icon: '🎯', label: 'Контроль інпутів', imperative: 'Неконтрольовані — значення лише в DOM', declarative: 'Контрольовані — єдине джерело правди', winner: 'declarative' },
              { icon: '🐛', label: 'Схильність до багів', imperative: 'Висока: стан DOM може розсинхронізуватись', declarative: 'Низька: UI завжди відповідає стану', winner: 'declarative' },
            ]}
          />

          <TaskCard
            number={4}
            title="Todo список"
            description="Додавання, видалення та позначення задач як виконаних"
            imperativeCode={TODO_IMPERATIVE_CODE}
            declarativeCode={TODO_DECLARATIVE_CODE}
            imperativeDemo={<TodoImperative />}
            declarativeDemo={<TodoDeclarative />}
            metrics={[
              { icon: '📏', label: 'Рядків коду', imperative: '55 рядків', declarative: '30 рядків', winner: 'declarative' },
              { icon: '🔧', label: 'DOM операцій', imperative: 'createElement ×4, addEventListener ×2, appendChild', declarative: 'Жодних — JSX описує структуру', winner: 'declarative' },
              { icon: '🗑️', label: 'Видалення елементів', imperative: 'splice + повне перемалювання списку', declarative: '.filter() — іммутабельне оновлення', winner: 'declarative' },
              { icon: '📖', label: 'Читабельність', imperative: 'Складно: 40+ рядків на renderList()', declarative: 'Простий JSX з .map()', winner: 'declarative' },
              { icon: '📈', label: 'Масштабованість', imperative: 'Кожна нова фіча = більше DOM-коду', declarative: 'Додати фічу = додати стан + JSX', winner: 'declarative' },
              { icon: '💾', label: 'Іммутабельність', imperative: 'Мутація масиву (push, splice) — небезпечно', declarative: 'Spread/filter — передбачувані оновлення', winner: 'declarative' },
            ]}
          />
        </div>
      </div>
    </main>
  );
};

export default TasksPage;
