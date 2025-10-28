import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <>
      <style>{`
        .welcome-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          padding: 2rem;
          overflow-y: auto;
        }
        .main-content {
          max-width: 800px;
          margin-bottom: 4rem;
        }
        .welcome-container h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .welcome-container .sub-headline {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: var(--color-text-secondary);
          margin-bottom: 2.5rem;
          max-width: 600px;
        }
        .welcome-container .cta-button {
          padding: 1rem 2.5rem;
          font-size: 1.25rem;
          font-weight: 700;
        }
        .trust-info {
            margin-top: 1rem;
            color: var(--color-text-secondary);
            font-size: 0.9rem;
        }
        
        .languages-section {
          width: 100%;
          max-width: 900px;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
        }
        .languages-section h2 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          color: var(--color-primary);
        }
        .language-category {
          margin-bottom: 2rem;
        }
        .language-category h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--color-text-primary);
          font-family: var(--font-secondary);
          font-weight: 600;
        }
        .language-pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }
        .language-pill {
          background-color: var(--color-surface-variant);
          color: var(--color-text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          border: 1px solid var(--color-border);
          transition: all 0.2s ease-in-out;
        }
        .language-pill:hover {
            color: var(--color-primary);
            border-color: var(--color-primary);
            transform: translateY(-2px);
        }
      `}</style>
      <div className="welcome-container">
        <div className="main-content">
          <h1>Your Personal AI Voice Director</h1>
          <p className="sub-headline">Go from script to studio-quality audio in seconds. Direct the performance, nail the accent, and captivate your audience.</p>
          <button onClick={onStart} className="cta-button">Start Your Free Trial</button>
          <div className="trust-info">
            <p>No credit card required. Perfect for YouTube, TikTok, Presentations, and more.</p>
          </div>
        </div>

        <div className="languages-section">
            <h2>Global Reach, Authentic Performance</h2>
            <div className="language-category">
                <h3>High-Fidelity Languages</h3>
                <div className="language-pills">
                    <span className="language-pill">English (US)</span>
                    <span className="language-pill">English (UK)</span>
                    <span className="language-pill">Spanish</span>
                    <span className="language-pill">French</span>
                    <span className="language-pill">German</span>
                    <span className="language-pill">Portuguese</span>
                </div>
            </div>
            <div className="language-category">
                <h3>Popular Languages Supported</h3>
                <div className="language-pills">
                    <span className="language-pill">Italian</span>
                    <span className="language-pill">Polish</span>
                    <span className="language-pill">Hindi (हिन्दी)</span>
                    <span className="language-pill">Arabic (العربية)</span>
                    <span className="language-pill">Japanese (日本語)</span>
                    <span className="language-pill">Chinese (中文)</span>
                    <span className="language-pill">Korean (한국어)</span>
                    <span className="language-pill">Tamil (தமிழ்)</span>
                    <span className="language-pill">Telugu (తెలుగు)</span>
                    <span className="language-pill">Malayalam (മലയാളം)</span>
                    <span className="language-pill">Sinhala (සිංහල)</span>
                    <span className="language-pill">Thai (ภาษาไทย)</span>
                    <span className="language-pill">Vietnamese (Tiếng Việt)</span>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
