const Bull = require("bull");
const Reel = require("../models/Reel.model");
const User = require("../models/User.model");
const r2 = require("../services/r2.service");
const claude = require("../services/claude.service");
const did = require("../services/did.service");
const sarvam = require("../services/sarvam.service");
const ffmpeg  = require("../services/ffmeg.service");
const fs = require("fs");

// Create Bull queue
const reelQueue = new Bull('reel-generation', {
  redis: process.env.REDIS_URL || 'redis://localhost:6379',
})

// ── PROCESS JOB ──────────────────────────────────────────────
reelQueue.process(async (job) => {
  const { reelId, userId } = job.data
  const startTime = Date.now()

  console.log(`🎬 Processing reel: ${reelId}`)

  // Temp file paths to clean up
  const tempFiles = []

  try {
    // ── STEP 1: Get reel from DB ─────────────────────────────
    const reel = await Reel.findById(reelId)
    if (!reel) throw new Error('Reel not found in database')

    // Update status to processing
    reel.status = 'processing'
    await reel.save()
    job.progress(10)

    // ── STEP 2: Generate script via Claude ───────────────────
    console.log('📝 Generating script via Claude...')
    const scriptData = await claude.generateScript({
      topic:    reel.topic,
      language: reel.language,
      mode:     reel.mode,
      duration: reel.duration,
    })

    reel.script = scriptData.fullScript
    await reel.save()
    job.progress(25)

    // ── STEP 3: Translate via Sarvam ─────────────────────────
    console.log('🔤 Translating via Sarvam...')
    const translatedScript = await sarvam.translate(
      scriptData.fullScript,
      reel.language
    )
    reel.translatedScript = translatedScript
    await reel.save()
    job.progress(35)

    // ── STEP 4: Generate voice via Sarvam TTS ────────────────
    console.log('🎙️ Generating voice via Sarvam TTS...')
    const audioTempPath = await sarvam.textToSpeech(
      translatedScript,
      reel.language
    )
    tempFiles.push(audioTempPath)

    // Upload audio to R2
    const audioKey = r2.audioKey(reelId)
    const audioUrl = await r2.uploadFile(audioTempPath, audioKey, 'audio/wav')
    reel.audioUrl  = audioUrl
    await reel.save()
    job.progress(50)

    let finalVideoPath

    if (reel.mode === 'creator') {
      // ── STEP 5a: Creator Mode — D-ID Talking Avatar ────────
      console.log('🤖 Creating talking avatar via D-ID...')

      if (!reel.inputPhotoUrl) {
        throw new Error('No photo uploaded. Please upload a photo first.')
      }

      const talkId = await did.createTalkingAvatar({
        photoUrl: reel.inputPhotoUrl,
        audioUrl: audioUrl,
      })
      job.progress(65)

      // Poll for result
      const rawVideoUrl = await did.getTalkResult(talkId)
      reel.rawVideoUrl  = rawVideoUrl
      await reel.save()
      job.progress(75)

      // Compose final 9:16 reel
      console.log('🎞️ Composing final reel...')
      finalVideoPath = await ffmpeg.composeCreatorReel({
        rawVideoUrl,
        script: translatedScript,
      })
      tempFiles.push(finalVideoPath)

    } else {
      // ── STEP 5b: SMB Mode — Animated Text Reel ─────────────
      console.log('📸 Creating SMB animated reel...')

      // Download photo for FFmpeg
      let photoPath
      if (reel.inputPhotoUrl) {
        photoPath = `/tmp/photo_${reelId}.jpg`
        await ffmpeg.downloadFile(reel.inputPhotoUrl, photoPath)
        tempFiles.push(photoPath)
      } else {
        // Use a default background if no photo
        photoPath = null
      }

      finalVideoPath = await ffmpeg.createSMBReel({
        photoPath:  photoPath,
        audioPath:  audioTempPath,
        script:     translatedScript,
        language:   reel.language,
      })
      tempFiles.push(finalVideoPath)
    }

    job.progress(85)

    // ── STEP 6: Upload final video to R2 ────────────────────
    console.log('☁️ Uploading final reel to R2...')
    const finalKey = r2.finalKey(reelId)
    const outputVideoUrl = await r2.uploadFile(
      finalVideoPath,
      finalKey,
      'video/mp4'
    )
    job.progress(95)

    // ── STEP 7: Update DB — mark done ────────────────────────
    reel.outputVideoUrl  = outputVideoUrl
    reel.status          = 'done'
    reel.processingTime  = Date.now() - startTime
    await reel.save()

    // Deduct credit from user
    await User.findByIdAndUpdate(userId, {
      $inc: {
        credits:         -reel.creditsUsed,
        totalCreditsUsed: reel.creditsUsed,
      },
    })

    job.progress(100)
    console.log(`✅ Reel done: ${reelId} in ${reel.processingTime}ms`)

    return { success: true, outputVideoUrl }

  } catch (err) {
    console.error(`❌ Reel failed: ${reelId}`, err.message)

    // Mark as failed in DB
    await Reel.findByIdAndUpdate(reelId, {
      status:       'failed',
      errorMessage: err.message,
    })

    // Refund credit on failure
    await User.findByIdAndUpdate(userId, {
      $inc: { credits: 1 }, // refund 1 credit
    })

    throw err // Bull will mark job as failed

  } finally {
    // Always clean up temp files
    ffmpeg.cleanupFiles(...tempFiles)
  }
})

// ── QUEUE EVENTS ─────────────────────────────────────────────
reelQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message)
})

reelQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`)
})

module.exports = reelQueue;