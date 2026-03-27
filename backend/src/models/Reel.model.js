const mongoose = require("mongoose");
 
const reelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    mode: {
        type: String,
        enum: ["smb", "creator"],
        required: true,
    },
    topic: {
        type: String,
        required: true,
        trim: true,
    },
    script: {
        type: String, // Claude generated script
    },
    translatedScript: {
        type: String, // Sarvam translated script
    },
    language: {
        type: String,
        enum: ['hindi', 'marathi', 'tamil', 'telugu', 'english'],
        default: 'hindi',
    },
    duration: {
        type: Number, // seconds — 30 or 60
        default: 30,
    },

    // R2 file URLs
    inputPhotoUrl: {
        type: String, // user uploaded photo
    },
    audioUrl: {
        type: String, // Sarvam TTS audio
    },
    rawVideoUrl: {
        type: String, // D-ID output
    },
    outputVideoUrl: {
        type: String, // final processed reel
    },

    // Job status
    status: {
        type: String,
        enum: ['pending', 'processing', 'done', 'failed'],
        default: 'pending',
        index: true,
    },
    errorMessage: {
        type: String, // if status === failed
    },
    // Credits
    creditsUsed: {
        type: Number,
        default: 1,
    },

    // Bull job ID — to track queue
    jobId: {
        type: String,
    },

    // Processing time in ms
    processingTime: {
        type: Number,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Reel', reelSchema)

