// This function sends a request to our secure backend.
async function callApi(body: object) {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'An error occurred.');
    }
    return data;
}

export async function refineVoicePrompt(originalPrompt: string): Promise<string> {
    const data = await callApi({ action: 'refine', originalPrompt });
    return data.refinedPrompt;
}

export async function generateVoiceOver(script: string, refinedPrompt: string): Promise<string> {
    const data = await callApi({ action: 'generate', script, refinedPrompt });
    return data.audioData;
}
