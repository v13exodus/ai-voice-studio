
export enum AppState {
  WELCOME = 'WELCOME',
  INPUT = 'INPUT',
  REFINING_PROMPT = 'REFINING_PROMPT',
  PROMPT_CONSENT = 'PROMPT_CONSENT',
  GENERATING_AUDIO = 'GENERATING_AUDIO',
  AUDIO_READY = 'AUDIO_READY',
}

export interface ProcessState {
  state: AppState;
  message: string;
}

export interface HistoryItem {
  id: string;
  script: string;
  originalPrompt: string;
  refinedPrompt: string;
  audioData: string;
  createdAt: string;
}
