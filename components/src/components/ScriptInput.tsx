import React from 'react';

const ScriptInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="input-section">
       <style>{`
        .input-section {
          margin-bottom: 2rem;
        }
        .input-section h2 {
          margin-bottom: 1rem;
        }
        .input-section textarea {
          width: 100%;
          padding: 0.8rem;
          font-size: 1rem;
          border: 1px solid var(--color-border);
          border-radius: 0.25rem;
          background-color: var(--color-surface);
          color: var(--color-text-primary);
        }
      `}</style>
      <h2>1. Enter Your Script</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste or type your script here..."
        rows={10}
        aria-label="Script Input"
      />
    </div>
  );
};

export default ScriptInput;
