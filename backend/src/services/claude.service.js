const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// generate script 
async function generateScript({ topic, language, mode, duration = 30 }) {
    const wordLimit = duration === 30 ? '60-80 words' : '120-150 words';
    const modeContext = mode === 'smb'
    ? 'a small Indian business (salon, restaurant, clinic, coaching institute, or retail shop)'
    : 'an Indian content creator, Founder, coach, or consultant building their personal brand';

    const systemPrompt = `You are a professional Indian video script director and writer.
    Create a structured scene breakdown JSON for a ${duration}-second Reel.
    The content is for ${modeContext}.

    Rules:
    - Total script length: ${wordLimit}
    - Language output: ${language}
    - Tone: Natural, conversational, engaging
    - For Hindi/Marathi/Tamil/Telugu: write in that language naturally
    - For Hinglish: mix Hindi and English naturally as Indians speak
    - Include a strong hook in first 3 seconds
    - End with a clear call to action
    - Output ONLY valid JSON, no explanation, no markdown backticks

    JSON Format:
    {
        "scenes": [
            {
            "scene_no": 1,
            "duration_sec": 10,
            "type": "hook",
            "script": "actual script text here",
            "visual_hint": "what should appear visually"
            }
        ],
        "full_script": "complete script as one paragraph",
        "tone": "festive|professional|emotional|energetic",
        "cta": "book|buy|call|follow|visit"
    }`

    const response = await client.messages.create({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     systemPrompt,
        messages: [{
            role:    'user',
            content: `Create a Reel script for: "${topic}"\nLanguage: ${language}\nDuration: ${duration} seconds`,
        }],
    });

    const text = response.content[0].text.trim();

    try {
        const parsed = JSON.parse(text);
        return {
            fullScript: parsed.full_script,
            scenes:     parsed.scenes,
            tone:       parsed.tone,
            cta:        parsed.cta,
        }
    } catch (error) {
        // If JSON parse fails, return raw text as script
        return {
            fullScript: text,
            scenes:     [{ scene_no: 1, script: text }],
            tone:       'professional',
            cta:        'call',
        }
    }
}

module.exports = { generateScript }