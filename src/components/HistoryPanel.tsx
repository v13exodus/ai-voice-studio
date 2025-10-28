import React from 'react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect }) => {
  return (
    <aside className="history-panel">
      <style>{`
        .history-panel {
            width: 300px;
            flex-shrink: 0;
            border-left: 1px solid var(--color-border);
            padding: 1.5rem;
            overflow-y: auto;
            background-color: var(--color-surface-variant);
        }
        .history-panel h3 {
            margin-top: 0;
        }
        .history-panel ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .history-panel li {
            padding: 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
            border-bottom: 1px solid var(--color-border);
        }
        .history-panel li:hover {
            background-color: var(--color-surface-hover);
        }
        .history-prompt {
            font-weight: bold;
            margin: 0 0 0.5rem 0;
        }
        .history-script {
            font-size: 0.9rem;
            color: var(--color-text-secondary);
            margin: 0 0 0.5rem 0;
        }
        .history-date {
            font-size: 0.8rem;
            color: var(--color-text-secondary);
        }
        .empty-history {
            font-size: 0.9rem;
            color: var(--color-text-secondary);
        }
      `}</style>
      <h3>History</h3>
      {history.length === 0 ? (
        <p className="empty-history">Your generated voice-overs will appear here.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.id} onClick={() => onSelect(item)} tabIndex={0}>
              <p className="history-prompt">{item.refinedPrompt}</p>
              <p className="history-script">"{item.script.substring(0, 50)}{item.script.length > 50 ? '...' : ''}"</p>
              <span className="history-date">{item.createdAt}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default HistoryPanel;
