import React, { useRef, useState, useCallback } from 'react';
import '../demos/demos.css';

const FormImperative: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameErrorRef = useRef<HTMLDivElement>(null);
  const emailErrorRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback(() => {
    let isValid = true;
    const nameInput = nameRef.current;
    const emailInput = emailRef.current;
    const nameError = nameErrorRef.current;
    const emailError = emailErrorRef.current;

    // Імперативно: ручна перевірка + маніпуляція класами
    if (nameInput && nameError) {
      if (nameInput.value.trim().length < 2) {
        nameInput.className = 'form-input error';
        nameError.textContent = "Ім'я має бути не менше 2 символів";
        nameError.style.display = 'block';
        isValid = false;
      } else {
        nameInput.className = 'form-input success';
        nameError.textContent = '';
        nameError.style.display = 'none';
      }
    }

    if (emailInput && emailError) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        emailInput.className = 'form-input error';
        emailError.textContent = 'Невірний формат email';
        emailError.style.display = 'block';
        isValid = false;
      } else {
        emailInput.className = 'form-input success';
        emailError.textContent = '';
        emailError.style.display = 'none';
      }
    }

    return isValid;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="demo-form">
        <div className="form-success">✓ Форму відправлено!</div>
        <button className="form-submit" onClick={() => {
          setSubmitted(false);
          if (nameRef.current) { nameRef.current.value = ''; nameRef.current.className = 'form-input'; }
          if (emailRef.current) { emailRef.current.value = ''; emailRef.current.className = 'form-input'; }
        }}>
          Спробувати знову
        </button>
      </div>
    );
  }

  return (
    <form className="demo-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label">Ім'я</label>
        <input ref={nameRef} className="form-input" type="text" placeholder="Ваше ім'я" />
        <div ref={nameErrorRef} className="form-error" style={{ display: 'none' }}></div>
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input ref={emailRef} className="form-input" type="email" placeholder="email@example.com" />
        <div ref={emailErrorRef} className="form-error" style={{ display: 'none' }}></div>
      </div>
      <button type="submit" className="form-submit">Відправити</button>
    </form>
  );
};

export default FormImperative;
