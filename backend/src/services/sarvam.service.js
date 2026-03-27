const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid')

const SARVAM_BASE = 'https://api.sarvam.ai';
const HEADERS = {
    "api-subscription-key": process.env.SARVAM_API_KEY,
    'Content-Type': 'application/json',
}

// Language code mapping
const LANG_CODES = {
  hindi:   'hi-IN',
  marathi: 'mr-IN',
  tamil:   'ta-IN',
  telugu:  'te-IN',
  english: 'en-IN',
}

async function translate(text, targetLanguage) {
    // If already in target language skip
    if (targetLanguage === 'english') return text;

    try {
        const res = await axios.post(`${SARVAM_BASE}/translate`, {
            input: text,
            source_language: 'en-IN',
            target_language: LANG_CODES[targetLanguage] || 'hi-IN',
            speaker_gender:  'Female',
            mode:            'formal',
        }, { headers: HEADERS });

        return res.data.translated_text || text;
    } catch (err) {
        console.error('Sarvam translate error:', err.response?.data || err.message)
        return text // fallback to original
    }
}


// text to speech
async function textToSpeech(text, language) {
    const langCode = LANG_CODES[language] || 'hi-IN'

    const res = await axios.post(`${SARVAM_BASE}/text-to-speech`, {
        inputs:          [text],
        target_language: langCode,
        speaker:         'meera',    // Female Indian voice
        pitch:           0,
        pace:            1.0,
        loudness:        1.5,
        speech_sample_rate: 22050,
        enable_preprocessing: true,
        model:           'bulbul:v1',
    }, {
        headers: HEADERS,
        responseType: 'json',
    });

    // Sarvam returns base64 audio
    const audioBase64 = res.data.audios?.[0]
    if (!audioBase64) throw new Error('Sarvam TTS returned no audio')

    // Save to temp file
    const audioBuffer = Buffer.from(audioBase64, "base64");
    const tempPath     = `/tmp/audio_${uuidv4()}.wav`
    fs.writeFileSync(tempPath, audioBuffer);

    return tempPath // return temp file path
}

module.exports = { translate, textToSpeech }