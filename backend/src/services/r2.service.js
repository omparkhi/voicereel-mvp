// const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { createClient } = require("@supabase/supabase-js")
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
)

const BUCKET = 'reelai-videos'

// upload file
async function uploadFile(localFilePath, key, contentType) {
    const fileBuffer = fs.readFileSync(localFilePath);

    const  { error } = await supabase.storage
        .from(BUCKET)
        .upload(key, fileBuffer, {
            contentType,
            upsert: true,
        }
    )

    if (error) throw new Error(`Upload failed: ${error.message}`);

    // get public url
    const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(key);

    return data.publicUrl;
}

// upload buffer
async function uploadBuffer(buffer, key, contentType) {
    const { error } = await supabase.storage
        .from(BUCKET)
        .update(key, buffer, {
            contentType,
            upsert: true
        })

    if (error) throw new Error(`Buffer upload failed: ${error.message}`)

    const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(key)

    return data.publicUrl;
}

// get signed url
async function getSignedDownloadUrl(key, expiresIn = 3600) {
    const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(key, expiresIn)

    if (error) throw new Error(`Signed URL failed: ${error.message}`)
    return data.signedUrl
}

// delete file
async function deleteFile(key) {
    const { error } = await supabase.storage
        .from(BUCKET)
        .remove([key])
        
    if (error) console.error('Delete error:', error.message)
}

// key generator
function photoKey(userId)  { return `users/${userId}/photo_${uuidv4()}.jpg` }
function audioKey(reelId)  { return `reels/${reelId}/audio.mp3` }
function rawKey(reelId)    { return `reels/${reelId}/raw.mp4` }
function finalKey(reelId)  { return `reels/${reelId}/final.mp4` }

module.exports = {
    uploadFile,
    uploadBuffer,
    getSignedDownloadUrl,
    deleteFile,
    photoKey,
    audioKey,
    rawKey,
    finalKey,
};

