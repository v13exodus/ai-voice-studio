import React, { useState, useCallback } from 'react';
import ScriptInput from './ScriptInput';
import VoicePromptInput from './VoicePromptInput';
import PromptRefinement from './PromptRefinement';
import AudioPlayer from './AudioPlayer';
import Loader from './Loader';
import HistoryPanel from './HistoryPanel';
import AccountModal from './AccountModal';
import { AppState, ProcessState, HistoryItem } from '../types';
import { refineVoicePrompt, generateVoiceOver } from '../services/geminiService';

const Workspace: React.FC = () => {
  const [script, setScript] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [audioData, setAudioData] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [processState, setProcessState] = useState<ProcessState>({
    state: AppState.INPUT,
    message: '',
  });
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const handleRefinePrompt = useCallback(async () => {
    if (!originalPrompt.trim()) {
      setProcessState({ state: AppState.INPUT, message: 'Please enter a voice description.' });
      return;
    }
    setProcessState({ state: AppState.REFINING_PROMPT, message: 'Refining voice prompt...' });
    try {
      const refined = await refineVoicePrompt(originalPrompt);
      setRefinedPrompt(refined);
      setProcessState({ state: AppState.PROMPT_CONSENT, message: '' });
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setProcessState({ state: AppState.INPUT, message: `Error refining prompt: ${errorMessage}` });
    }
  }, [originalPrompt]);

  const handleGenerateAudio = useCallback(async () => {
    if (!script.trim()) {
        setProcessState({ state: AppState.PROMPT_CONSENT, message: 'Please enter a script before generating audio.' });
        return;
    }
    setProcessState({ state: AppState.GENERATING_AUDIO, message: 'Generating audio... This may take a moment.' });
    try {
      const generatedAudioData = await generateVoiceOver(script, refinedPrompt);
      setAudioData(generatedAudioData);

      const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        script,
        originalPrompt,
        refinedPrompt,
        audioData: generatedAudioData,
        createdAt: new Date().toLocaleString(),
      };
      setHistory(prev => [newHistoryItem, ...prev]);

      setProcessState({ state: AppState.AUDIO_READY, message: '' });
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setProcessState({ state: AppState.PROMPT_CONSENT, message: `Error generating audio: ${errorMessage}` });
    }
  }, [script, refinedPrompt, originalPrompt]);

  const handleStartOver = () => {
    setScript('');
    setOriginalPrompt('');
    setRefinedPrompt('');
    setAudioData('');
    setProcessState({ state: AppState.INPUT, message: '' });
  };
    
  const handleHistorySelect = (item: HistoryItem) => {
    setScript(item.script);
    setOriginalPrompt(item.originalPrompt);
    setRefinedPrompt(item.refinedPrompt);
    setAudioData(item.audioData);
    setProcessState({ state: AppState.AUDIO_READY, message: '' });
  };

  const renderMainContent = () => {
    switch (processState.state) {
      case AppState.INPUT:
        return (
          <>
            <ScriptInput value={script} onChange={setScript} />
            <VoicePromptInput
              value={originalPrompt}
              onChange={setOriginalPrompt}
              onGenerate={handleRefinePrompt}
            />
          </>
        );
      case AppState.REFINING_PROMPT:
        return <Loader message={processState.message} />;
      case AppState.PROMPT_CONSENT:
        return (
          <PromptRefinement
            originalPrompt={originalPrompt}
            refinedPrompt={refinedPrompt}
            onConfirm={handleGenerateAudio}
            onEdit={() => setProcessState({ state: AppState.INPUT, message: '' })}
          />
        );
      case AppState.GENERATING_AUDIO:
        return <Loader message={processState.message} />;
      case AppState.AUDIO_READY:
        return (
            <AudioPlayer
                audioData={audioData}
                script={script}
                prompt={refinedPrompt}
                onStartOver={handleStartOver}
            />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        .workspace-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
        }
        .workspace-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            border-bottom: 1px solid var(--color-border);
            flex-shrink: 0;
        }
        .workspace-header h1 {
            font-size: 1.5rem;
            margin: 0;
        }
        .workspace-main {
            display: flex;
            flex-grow: 1;
            overflow: hidden;
        }
        .main-content {
            flex-grow: 1;
            padding: 2rem;
            overflow-y: auto;
        }
        .error-message {
            color: var(--color-error);
            margin-top: 1rem;
            text-align: center;
        }
      `}</style>
      <div className="workspace-container">
        <header className="workspace-header">
          <h1>AI Voice-Over Generator</h1>
          <button onClick={() => setIsAccountModalOpen(true)}>Account</button>
        </header>
        <main className="workspace-main">
          <div className="main-content">
              {renderMainContent()}
              {processState.message && (processState.state === AppState.INPUT || processState.state === AppState.PROMPT_CONSENT) &&
                <p className="error-message">{processState.message}</p>
              }
          </div>
          <HistoryPanel history={history} onSelect={handleHistorySelect} />
        </main>
        <AccountModal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)} />
      </div>
    </>
  );
};

export default Workspace;
