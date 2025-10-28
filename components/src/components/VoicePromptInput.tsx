import React from 'react';

const VoicePromptInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
}> = ({ value, onChange, onGenerate }) => {
  return (
    <div className="input-section">
      <h2>2. Describe the Voice</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., A deep, warm male voice with a British accent, speaking slowly and clearly, sounding like a wise storyteller."
        rows={5}
        aria-label="Voice Prompt Input"
      />
      <button onClick={onGenerate} style={{ marginTop: '1rem' }}>Generate Voice-Over</button>
    </div>
  );
};

export default VoicePromptInput;
