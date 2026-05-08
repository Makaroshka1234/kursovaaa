import React from 'react';
import './ComparisonPage.css';

interface CriteriaRow {
  criteria: string;
  icon: string;
  imperative: string;
  declarative: string;
  imperativeScore: number;
  declarativeScore: number;
}

const CRITERIA: CriteriaRow[] = [
  {
    criteria: 'Читабельність',
    icon: '📖',
    imperative: 'Код описує покрокові дії — важко зрозуміти загальну картину',
    declarative: 'Код описує результат — легко зрозуміти що відбувається',
    imperativeScore: 2,
    declarativeScore: 5,
  },
  {
    criteria: 'Складність',
    icon: '🧩',
    imperative: 'Потрібно керувати DOM, станом, подіями вручну',
    declarative: 'React бере на себе оновлення DOM',
    imperativeScore: 4,
    declarativeScore: 2,
  },
  {
    criteria: 'Масштабованість',
    icon: '📈',
    imperative: 'Складно підтримувати при зростанні проєкту',
    declarative: 'Компоненти легко композити та перевикористовувати',
    imperativeScore: 2,
    declarativeScore: 5,
  },
  {
    criteria: 'Тестованість',
    icon: '🧪',
    imperative: 'Тести потребують мокання DOM і подій',
    declarative: 'Тести перевіряють стан і рендер — просто і надійно',
    imperativeScore: 2,
    declarativeScore: 4,
  },
  {
    criteria: 'Продуктивність',
    icon: '⚡',
    imperative: 'Точковий контроль, але легко зробити зайві перемальовування',
    declarative: 'Virtual DOM оптимізує оновлення автоматично',
    imperativeScore: 3,
    declarativeScore: 4,
  },
  {
    criteria: 'Обсяг коду',
    icon: '📏',
    imperative: 'Більше boilerplate коду для тих самих задач',
    declarative: 'Менше коду, вища виразність',
    imperativeScore: 2,
    declarativeScore: 5,
  },
];

const ScoreBar: React.FC<{ score: number; type: 'imperative' | 'declarative' }> = ({ score, type }) => {
  return (
    <div className="score-bar-container">
      <div className="score-dots">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`score-dot ${i <= score ? `filled ${type}` : ''}`}
          />
        ))}
      </div>
      <span className={`score-number ${type}`}>{score}/5</span>
    </div>
  );
};

const ComparisonPage: React.FC = () => {
  const imperativeAvg = (CRITERIA.reduce((s, c) => s + c.imperativeScore, 0) / CRITERIA.length).toFixed(1);
  const declarativeAvg = (CRITERIA.reduce((s, c) => s + c.declarativeScore, 0) / CRITERIA.length).toFixed(1);

  return (
    <main className="comparison-page" id="comparison-page">
      <div className="container">
        <header className="comparison-header">
          <h1 className="comparison-title animate-fade-in-up">
            <span className="gradient-text">Порівняння підходів</span>
          </h1>
          <p className="comparison-subtitle animate-fade-in-up delay-1">
            Детальний аналіз за ключовими критеріями розробки
          </p>
        </header>

        {/* Desktop table */}
        <div className="comparison-table-wrapper glass-card animate-fade-in-up delay-2">
          <table className="comparison-table" id="comparison-table">
            <thead>
              <tr>
                <th className="th-criteria">Критерій</th>
                <th className="th-imperative">
                  <span className="th-label">
                    <span className="label-dot imperative-dot"></span>
                    Імперативний
                  </span>
                </th>
                <th className="th-declarative">
                  <span className="th-label">
                    <span className="label-dot declarative-dot"></span>
                    Декларативний
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {CRITERIA.map((row, idx) => (
                <tr key={row.criteria} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * (idx + 3)}s`, opacity: 0 }}>
                  <td className="td-criteria">
                    <span className="criteria-icon">{row.icon}</span>
                    <span className="criteria-name">{row.criteria}</span>
                  </td>
                  <td className="td-imperative">
                    <p className="cell-desc">{row.imperative}</p>
                    <ScoreBar score={row.imperativeScore} type="imperative" />
                  </td>
                  <td className="td-declarative">
                    <p className="cell-desc">{row.declarative}</p>
                    <ScoreBar score={row.declarativeScore} type="declarative" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="comparison-summary animate-fade-in-up delay-5">
          <div className="summary-card glass-card imperative-summary">
            <div className="summary-label">🔴 Імперативний</div>
            <div className="summary-score">{imperativeAvg}</div>
            <div className="summary-sub">середній бал</div>
          </div>
          <div className="summary-vs">VS</div>
          <div className="summary-card glass-card declarative-summary">
            <div className="summary-label">🟢 Декларативний</div>
            <div className="summary-score">{declarativeAvg}</div>
            <div className="summary-sub">середній бал</div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="conclusion glass-card animate-fade-in-up delay-5">
          <div className="conclusion-icon">🏆</div>
          <h3>Висновок</h3>
          <p>
            Декларативний підхід <strong>перемагає</strong> за більшістю критеріїв.
            React обрав саме цей підхід, тому що він дозволяє писати
            <em> передбачуваний</em>, <em>простий у підтримці</em> та
            <em> масштабований</em> код. Імперативний підхід корисний
            для розуміння основ, але у сучасній розробці декларативна
            парадигма є стандартом.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ComparisonPage;
