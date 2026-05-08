import React, { useState } from 'react';
import '../demos/demos.css';

interface FormErrors {
  name?: string;
  email?: string;
}

const FormDeclarative: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});

  // Декларативно: валідація через стан
  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (name.trim().length < 2) errs.name = "Ім'я має бути не менше 2 символів";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Невірний формат email';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true });
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="demo-form">
        <div className="form-success">✓ Форму відправлено!</div>
        <button className="form-submit" onClick={handleReset}>
          Спробувати знову
        </button>
      </div>
    );
  }

  // Декларативно: клас інпута визначається станом
  const nameClass = touched.name
    ? errors.name ? 'form-input error' : 'form-input success'
    : 'form-input';
  const emailClass = touched.email
    ? errors.email ? 'form-input error' : 'form-input success'
    : 'form-input';

  return (
    <form className="demo-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label">Ім'я</label>
        <input
          className={nameClass}
          type="text"
          placeholder="Ваше ім'я"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => {
            setTouched(t => ({ ...t, name: true }));
            setErrors(validate());
          }}
        />
        {touched.name && errors.name && <div className="form-error">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          className={emailClass}
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => {
            setTouched(t => ({ ...t, email: true }));
            setErrors(validate());
          }}
        />
        {touched.email && errors.email && <div className="form-error">{errors.email}</div>}
      </div>
      <button type="submit" className="form-submit">Відправити</button>
    </form>
  );
};

export default FormDeclarative;
