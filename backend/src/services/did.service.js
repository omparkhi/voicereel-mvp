const axios = require("axios");

const DID_BASE = 'https://api.d-id.com';
const HEADERS = {
  Authorization: `Basic ${Buffer.from(process.env.DID_API_KEY + ':').toString('base64')}`,
  'Content-Type': 'application/json',
};

async function createTalkingAvatar({ photoUrl, audioUrl }) {
    // create the talk
    const createRes = await axios.post(`${DID_BASE}/talks`, {
        source_url: photoUrl,
        script: {
            type: "audio",
            audio_url: audioUrl,
        },
        config: {
            fluent: true,
            pad_audio: 0.0,
            stitch: true,
        },
    }, { headers: HEADERS })

    const talkId = createRes.data.id;
    if (!talkId) throw new Error('D-ID did not return a talk ID');

    return talkId;
}

// poll the result
async function getTalkResult(talkId, maxRetries = 30) {
    for (let i = 0; i < maxRetries; i++) {
        // Wait 3 seconds between polls
        await new Promise(r => setTimeout(r, 3000));

        const res = await axios.get(`${DID_BASE}/talks/${talkId}`, {
            headers: HEADERS,
        });

        const status = res.data.status;

        if (status === "done") {
            return res.data.result_url;
        }
        if (status === 'error') {
            throw new Error(`D-ID failed: ${res.data.error?.description || 'Unknown error'}`)
        }

        // Still processing — continue polling
        console.log(`D-ID status: ${status} (attempt ${i + 1}/${maxRetries})`)
    }
    throw new Error('D-ID timed out after 90 seconds')
}

module.exports = { createTalkingAvatar , getTalkResult };