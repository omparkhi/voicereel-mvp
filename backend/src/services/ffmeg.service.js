const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid')
const axios  = require('axios')

// download file from url
async function downloadFile(url, destPath) {
    const res = await axios({ url, responseType: "arraybuffer" })
    fs.writeFileSync(destPath, Buffer.from(res.data));

    return destPath;
}

// SMB MODE — Animated Text Reel
// Photo + audio → animated text reel (no D-ID needed)
async function createSMBReel({ photoPath, audioPath, script, language }) {
  const outputPath = `/tmp/smb_${uuidv4()}.mp4`

  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(photoPath)
      .inputOptions(['-loop 1'])
      .input(audioPath)
      .videoFilter([
        // Scale to 9:16 (1080x1920)
        'scale=1080:1920:force_original_aspect_ratio=decrease',
        'pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black',
        // Add text overlay (script preview)
        `drawtext=text='${script.substring(0, 50)}...':fontcolor=white:fontsize=40:x=(w-text_w)/2:y=h-200:box=1:boxcolor=black@0.5:boxborderw=10`,
        // Fade in
        'fade=in:0:30',
      ])
      .outputOptions([
        '-c:v libx264',
        '-c:a aac',
        '-shortest',      // stop when audio ends
        '-pix_fmt yuv420p',
        '-movflags +faststart',
      ])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run()
  })
}

// CREATOR MODE — Compose Avatar Video 
// Download D-ID output + add captions + format to 9:16
async function composeCreatorReel({ rawVideoUrl, script }) {
  const rawPath    = `/tmp/raw_${uuidv4()}.mp4`
  const outputPath = `/tmp/creator_${uuidv4()}.mp4`

  // Download raw video from D-ID / R2
  await downloadFile(rawVideoUrl, rawPath)

  return new Promise((resolve, reject) => {
    ffmpeg(rawPath)
      .videoFilter([
        // Scale to 9:16
        'scale=1080:1920:force_original_aspect_ratio=decrease',
        'pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black',
        // Add caption at bottom
        `drawtext=text='${script.substring(0, 60)}':fontcolor=white:fontsize=38:x=(w-text_w)/2:y=h-180:box=1:boxcolor=black@0.6:boxborderw=8`,
      ])
      .outputOptions([
        '-c:v libx264',
        '-c:a aac',
        '-pix_fmt yuv420p',
        '-movflags +faststart',
      ])
      .output(outputPath)
      .on('end', () => {
        fs.unlinkSync(rawPath) // clean up
        resolve(outputPath)
      })
      .on('error', (err) => {
        if (fs.existsSync(rawPath)) fs.unlinkSync(rawPath)
        reject(err)
      })
      .run()
  })
}

// cleanup
function cleanupFiles(...filePaths) {
  for (const filePath of filePaths) {
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    } catch (err) {
      console.error('Cleanup error:', err.message)
    }
  }
}

module.exports = { createSMBReel, composeCreatorReel, cleanupFiles, downloadFile }