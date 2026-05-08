import React from 'react';
import { Link } from 'react-router-dom';
import './HeroPage.css';

const HeroPage: React.FC = () => {
  return (
    <main className="hero-page" id="hero-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
         
          <h1 className="hero-title animate-fade-in-up delay-1">
            <span className="gradient-text">Імперативний</span>
            <span className="hero-vs">vs</span>
            <span className="gradient-text">Декларативний</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up delay-2">
            Дізнайтесь, чим відрізняються два ключові підходи в програмуванні
            та чому React обирає декларативну парадигму
          </p>
          <div className="hero-cta animate-fade-in-up delay-3">
            <Link to="/tasks" className="btn btn-primary" id="cta-tasks">
               Перейти до задач
            </Link>
            <Link to="/comparison" className="btn btn-secondary" id="cta-compare">
              Порівняння
            </Link>
          </div>
        </div>
      </section>

      {/* Approaches Section */}
      <section className="approaches-section">
        <div className="container">
          <div className="approaches-grid">
            {/* Imperative */}
            <div className="approach-card glass-card animate-fade-in-up delay-2" id="approach-imperative">
              <div className="approach-icon imperative-icon">🔴</div>
              <h2 className="approach-title">Імперативний підхід</h2>
              <p className="approach-tagline">«ЯК це зробити»</p>
              <div className="approach-description">
                <p>
                  Розробник описує <strong>покрокові інструкції</strong> для досягнення результату.
                  Кожна дія явно вказана: знайди елемент, зміни його, додай клас, оновити текст.
                </p>
              </div>
              <div className="approach-example">
                <div className="example-label">Приклад з життя:</div>
                <p className="example-text">
                  «Візьми каструлю, налий воду, постав на плиту, увімкни вогонь, 
                  зачекай поки закипить, кинь макарони, вари 8 хвилин...»
                </p>
              </div>
              <div className="approach-traits">
                <div className="trait">
                  <span className="trait-icon">📝</span>
                  <span>Крок за кроком</span>
                </div>
                <div className="trait">
                  <span className="trait-icon">🎯</span>
                  <span>Пряме керування DOM</span>
                </div>
                <div className="trait">
                  <span className="trait-icon">🔧</span>
                  <span>Більше коду</span>
                </div>
              </div>
            </div>

            {/* Declarative */}
            <div className="approach-card glass-card animate-fade-in-up delay-3" id="approach-declarative">
              <div className="approach-icon declarative-icon">🟢</div>
              <h2 className="approach-title">Декларативний підхід</h2>
              <p className="approach-tagline">«ЩО потрібно отримати»</p>
              <div className="approach-description">
                <p>
                  Розробник описує <strong>бажаний результат</strong>, а React сам вирішує,
                  як його досягти. Стан змінився → UI автоматично оновлюється.
                </p>
              </div>
              <div className="approach-example">
                <div className="example-label">Приклад з життя:</div>
                <p className="example-text">
                  «Мені потрібні готові макарони аль денте з соусом песто» — 
                  а кухар сам вирішує як це зробити.
                </p>
              </div>
              <div className="approach-traits">
                <div className="trait">
                  <span className="trait-icon">✨</span>
                  <span>Описуємо результат</span>
                </div>
                <div className="trait">
                  <span className="trait-icon">⚛️</span>
                  <span>React керує DOM</span>
                </div>
                <div className="trait">
                  <span className="trait-icon">📦</span>
                  <span>Менше коду</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Idea */}
      <section className="key-idea-section">
        <div className="container">
          <div className="key-idea glass-card animate-fade-in-up delay-4">
            <div className="key-idea-icon">💡</div>
            <h3>Ключова ідея</h3>
            <p>
              React використовує <strong>декларативний</strong> підхід: ви описуєте, 
              як має виглядати UI при певному стані, а React ефективно оновлює DOM. 
              Це робить код <em>читабельнішим</em>, <em>передбачуванішим</em> і 
              <em>простішим у підтримці</em>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroPage;
