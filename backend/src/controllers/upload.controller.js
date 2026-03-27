const multer = require("multer");
const path = require("path");
const fs = require("fs");
const r2 = require("../services/r2.service");

// store uploads in /tmp temporaily
const upload = multer({
    dest: "/tmp/uploads",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10mb max
    fileFilter: (req, file, cb) => {
        const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) cb(null, true)
        else cb(new Error('Only JPG, PNG, WEBP images allowed'))
    }
}).single("photo");

async function uploadPhoto(req, res) {
    // handle multer upload
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No photo uploaded',
            })
        }

        try {
            const userId = req.user._is.toSring();
            const key = r2.photoKey(userId);

            // upload to r2
            const url = await r2.uploadFile(
                req.file.path,
                key, 
                req.file.mimetype,
            )

            // Clean up temp file
            fs.unlinkSync(req.file.path);

            // save url to user profile
            req.user.profilePhotoUrl = url;
            await req.user.save();

            res.json({
                success: true,
                message: 'Photo uploaded successfully',
                url,
            });
            
        } catch (uploadErr) {
            // Clean up temp file on error
            if (req.file?.path) fs.unlinkSync(req.file.path)

            console.error('Upload error:', uploadErr.message)
            res.status(500).json({
                success: false,
                message: 'Failed to upload photo. Please try again.',
            })
        }
    })
}

module.exports = { uploadPhoto };
