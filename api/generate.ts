import { GoogleGenAI, Modality } from "@google/genai";

// This is a serverless function. It runs on a server, not in the browser.
// The API key is securely accessed from environment variables on the server.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function handles all incoming requests to '/api/generate'
export async function POST(req: Request) {
  try {
    const { action, script, refinedPrompt, originalPrompt } = await req.json();

    if (action === 'refine') {
      const model = 'gemini-2.5-flash';
      const systemInstruction = `You are a world-class voice-over director. Your task is to synthesize a user's detailed requirements into a refined voice prompt.
The refined prompt must be a single, concise sentence that is highly descriptive and suitable for a Text-to-Speech (TTS) engine.
Incorporate all available details: age, gender, accent, language, emotional tone (e.g., happy, sad, angry), speaking speed (e.g., slow, fast), pitch (e.g., low, high), and other specific vocal characteristics.
If a reference link or sample description is provided, use it to understand the desired *impact and style*, but do not attempt to clone the voice. The goal is to capture the essence, not to imitate.
Do not add any preamble or explanation. Only output the refined prompt sentence.`;

      const response = await ai.models.generateContent({
        model,
        contents: `Synthesize and refine the following voice requirements into a single descriptive sentence: ${originalPrompt}`,
        config: { systemInstruction }
      });

      return new Response(JSON.stringify({ refinedPrompt: response.text.trim() }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } else if (action === 'generate') {
      const model = 'gemini-2.5-flash-preview-tts';
      const ttsPrompt = `(${refinedPrompt}) ${script}`;

      const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: ttsPrompt }] }],
        config: { responseModalities: [Modality.AUDIO] },
      });

      const audioPart = response.candidates?.[0]?.content?.parts?.[0];

      if (audioPart && audioPart.inlineData) {
        return new Response(JSON.stringify({ audioData: audioPart.inlineData.data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error('Audio data not found in AI response.');
    
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action specified.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred on the server.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
