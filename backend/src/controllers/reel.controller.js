const Reel = require("../models/Reel.model");
const r2 = require("../services/r2.service");

// GET STATUS
async function getReelStatus(req, res) {
    try {
        const reel = await Reel.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!reel) {
            return res.status(404).json({ success: false, message: "reel not found" });
        }

        res.json({
            success: true,
            reelId: reel._id,
            status: reel.status,
            outputVideoUrl: reel.outputVideoUrl,
            errorMessage: reel.errorMessage,
            processingTime: reel.processingTime
        });

    } catch (error) {
        // console.log()
        res.status(500).json({ success: false, message: 'Failed to get status' })
    }
}

// get download url
async function getDownloadUrl(req, res) {
    try {
        const reel = await Reel.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })

        if (!reel || !reel.status !== "done") {
            return res.status(404).json({ success: false, message: 'Reel not ready yet', })
        }

        // Generate signed URL valid for 1 hour
        const key = `reels/${reel._id}/final.mp4`
        const signedUrl = await r2.getSignedDownloadUrl(key, 3600);
        res.json({
            success: true,
            downloadUrl: signedUrl,
            expiresIn:   3600,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get download URL' })
    }
}


// list all reels
async function listReels(req, res) {
    try {
        const page  = parseInt(req.query.page)  || 1
        const limit = parseInt(req.query.limit) || 20
        const skip  = (page - 1) * limit

        const reels = await reel.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-script -translatedScript') // exclude large fields

        const total = await Reel.countDocuments({ userId: req.user._id });

        res.json({
            success: true,
            reels,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to get reels' })
    }
}

async function deleteReel(req, res) {
    try {
        const reel = await Reel.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })

        if (!reel) {
            return res.status(404).json({ success: false, message: 'Reel not found' })
        }

        // delete r2 files
        const reelId = reel._id.toString();
        const keys   = [
            `reels/${reelId}/audio.mp3`,
            `reels/${reelId}/raw.mp4`,
            `reels/${reelId}/final.mp4`,
        ];

        await Promise.allSettled(keys.map(key => r2.deleteFile(key)));

        // delete from db
        await Reel.deleteOne({ _id: reel._id });

        res.json({ success: true, message: 'Reel deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete reel' });
    }
}

// ── GET CREDITS ──────────────────────────────────────────────
async function getCredits(req, res) {
  res.json({
    success: true,
    credits:         req.user.credits,
    totalCreditsUsed: req.user.totalCreditsUsed,
    plan:            req.user.plan,
  })
}

module.exports = { getReelStatus, getDownloadUrl, listReels, deleteReel, getCredits }