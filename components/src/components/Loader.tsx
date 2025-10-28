import React from 'react';

const Loader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="loader-container">
      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          text-align: center;
        }
        .spinner {
          border: 4px solid var(--color-border);
          border-top: 4px solid var(--color-primary);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
