import React from 'react';

const PromptRefinement: React.FC<{
  originalPrompt: string;
  refinedPrompt: string;
  onConfirm: () => void;
  onEdit: () => void;
}> = ({
  originalPrompt,
  refinedPrompt,
  onConfirm,
  onEdit,
}) => {
  return (
    <div className="prompt-refinement-section">
      <style>{`
        .prompt-refinement-section h2 {
          margin-bottom: 1.5rem;
        }
        .prompt-box {
          border: 1px solid var(--color-border);
          border-radius: 0.25rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .prompt-box h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        .prompt-box.refined {
          background-color: var(--color-surface-variant);
        }
        .subtle-text {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }
        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }
      `}</style>
      <h2>3. Review and Confirm Voice Prompt</h2>
      <div className="prompt-box">
        <h3>Your Prompt:</h3>
        <p>{originalPrompt}</p>
      </div>
      <div className="prompt-box refined">
        <h3>Refined Prompt:</h3>
        <p><strong>{refinedPrompt}</strong></p>
        <p className="subtle-text">We've refined your description into a concise prompt for the TTS engine.</p>
      </div>
      <div className="button-group">
        <button onClick={onEdit} className="secondary">Edit</button>
        <button onClick={onConfirm}>Confirm and Generate Audio</button>
      </div>
    </div>
  );
};

export default PromptRefinement;
