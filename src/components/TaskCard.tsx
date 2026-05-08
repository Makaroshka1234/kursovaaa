import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import './TaskCard.css';

export interface StatMetric {
  icon: string;
  label: string;
  imperative: string;
  declarative: string;
  winner: 'imperative' | 'declarative' | 'tie';
}

interface TaskCardProps {
  number: number;
  title: string;
  description: string;
  imperativeCode: string;
  declarativeCode: string;
  imperativeDemo: React.ReactNode;
  declarativeDemo: React.ReactNode;
  metrics: StatMetric[];
}

type TabType = 'demo' | 'code';

const TaskCard: React.FC<TaskCardProps> = ({
  number,
  title,
  description,
  imperativeCode,
  declarativeCode,
  imperativeDemo,
  declarativeDemo,
  metrics,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('demo');

  const imperativeWins = metrics.filter(m => m.winner === 'imperative').length;
  const declarativeWins = metrics.filter(m => m.winner === 'declarative').length;

  return (
    <div className="task-card glass-card animate-fade-in-up" id={`task-${number}`}>
      <div className="task-card-header">
        <div className="task-number">#{number}</div>
        <div className="task-info">
          <h3 className="task-title">{title}</h3>
          <p className="task-description">{description}</p>
        </div>
        <div className="task-tabs">
          <button
            className={`task-tab ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            ▶ Демо
          </button>
          <button
            className={`task-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            ⟨/⟩ Код
          </button>
        </div>
      </div>

      <div className="task-card-body">
        <div className="task-columns">
          {/* Imperative */}
          <div className="task-column imperative">
            <div className="column-label imperative-label">
              <span className="label-dot imperative-dot"></span>
              🔴 Імперативно
            </div>
            {activeTab === 'demo' ? (
              <div className="demo-area">{imperativeDemo}</div>
            ) : (
              <CodeBlock code={imperativeCode} title="imperative.tsx" />
            )}
          </div>

          {/* Divider */}
          <div className="column-divider">
            <span className="divider-label">VS</span>
          </div>

          {/* Declarative */}
          <div className="task-column declarative">
            <div className="column-label declarative-label">
              <span className="label-dot declarative-dot"></span>
              🟢 Декларативно
            </div>
            {activeTab === 'demo' ? (
              <div className="demo-area">{declarativeDemo}</div>
            ) : (
              <CodeBlock code={declarativeCode} title="declarative.tsx" />
            )}
          </div>
        </div>
      </div>

      {/* Comparison stats */}
      <div className="task-card-stats">
        <div className="stats-title">
          <span className="stats-title-icon">📊</span>
          Порівняння
        </div>
        <div className="stats-grid">
          {metrics.map((metric, idx) => (
            <div className="stat-row" key={idx}>
              <div className="stat-metric">
                <span className="stat-icon">{metric.icon}</span>
                <span className="stat-label">{metric.label}</span>
              </div>
              <div className={`stat-cell imperative-cell ${metric.winner === 'imperative' ? 'winner' : metric.winner === 'declarative' ? 'loser' : ''}`}>
                {metric.imperative}
              </div>
              <div className={`stat-cell declarative-cell ${metric.winner === 'declarative' ? 'winner' : metric.winner === 'imperative' ? 'loser' : ''}`}>
                {metric.declarative}
              </div>
            </div>
          ))}
        </div>
        <div className="stats-verdict">
          <div className="verdict-score">
            <span className="verdict-imp">{imperativeWins}</span>
            <span className="verdict-sep">:</span>
            <span className="verdict-dec">{declarativeWins}</span>
          </div>
          <div className="verdict-text">
            {declarativeWins > imperativeWins
              ? '🟢 Декларативний підхід ефективніший'
              : imperativeWins > declarativeWins
                ? '🔴 Імперативний підхід ефективніший'
                : '🟡 Підходи рівноцінні'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
