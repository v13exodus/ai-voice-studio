import React, { useState, useEffect, useRef } from 'react';
import { decode } from '../utils/audioUtils';
import { createWavFile } from '../utils/wavUtils';

interface AudioPlayerProps {
    audioData: string;
    script: string;
    prompt: string;
    onStartOver: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioData, script, prompt, onStartOver }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(() => {
        if (audioData) {
            let url: string | null = null;
            try {
                const pcmDataBytes = decode(audioData);
                // The raw data is 16-bit PCM, so we need to create an Int16Array view on the buffer
                const pcmDataInt16 = new Int16Array(pcmDataBytes.buffer);
                // Create a WAV file Blob to be used in the <audio> element
                const wavBlob = createWavFile(pcmDataInt16, 24000, 1); // The AI TTS model generates 24kHz, mono audio
                url = URL.createObjectURL(wavBlob);
                setAudioUrl(url);

            } catch (error) {
                console.error("Failed to decode or create WAV file:", error);
                setAudioUrl(null);
            }
            return () => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            };
        }
    }, [audioData]);

    const handleDownload = () => {
        if (audioUrl) {
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = 'voice-over.wav';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    return (
        <div className="audio-player-section">
            <style>{`
                .audio-player-section h2 { margin-bottom: 1.5rem; }
                .generation-summary {
                    border: 1px solid var(--color-border);
                    border-radius: 0.25rem;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    background-color: var(--color-surface-variant);
                }
                .player-controls {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
            `}</style>
            <h2>4. Your Voice-Over is Ready!</h2>
            <div className="generation-summary">
                <p><strong>Script:</strong> "{script.substring(0, 100)}{script.length > 100 ? '...' : ''}"</p>
                <p><strong>Voice Prompt:</strong> "{prompt}"</p>
            </div>
            {audioUrl ? (
                <div className="player-controls">
                    <audio 
                        ref={audioRef} 
                        src={audioUrl} 
                        onEnded={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        controls
                    />
                    <button onClick={handleDownload}>Download WAV</button>
                </div>
            ) : (
                <p className="error-message">Error loading audio.</p>
            )}
             <button onClick={onStartOver} className="secondary">Create New Voice-Over</button>
        </div>
    );
};

export default AudioPlayer;
