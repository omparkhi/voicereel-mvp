const Reel = require("../models/Reel.model");
const reelQueue = require("../workers/reelJob.worker");

async function generateReel(req, res) {
    try {
        const { topic, language, mode, duration } = req.body;
        const user = req.user;

        // validate
        if (!topic || topic.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a topic (at least 3 characters)',
            })
        }

        const validLanguages = ['hindi', 'marathi', 'tamil', 'telugu', 'english'];
        if (!validLanguages.includes(language)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid language selected',
            })
        }

        const validModes = ['smb', 'creator'];
        if (!validModes.includes(mode)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid mode. Choose smb or creator',
            })
        }

        // Calculate credits needed
        const creditsNeeded = duration === 60 ? 2 : 1;

        // Check credits (double check — middleware also checks)
        if (user.credits < creditsNeeded) {
            return res.status(402).json({
                success: false,
                message: `Need ${creditsNeeded} credit(s). You have ${user.credits}.`,
                credits: user.credits,
            })
        }


        // Creator mode requires a photo
        if (mode === 'creator' && !user.profilePhotoUrl) {
            return res.status(400).json({
                success: false,
                message: 'Please upload your photo first for Creator mode',
            })
        }

        // Create reel record in DB
        const reel = await Reel.create({
            userId:        user._id,
            mode:          mode || user.segment || 'smb',
            topic:         topic.trim(),
            language:      language || 'hindi',
            duration:      duration || 30,
            creditsUsed:   creditsNeeded,
            inputPhotoUrl: user.profilePhotoUrl || null,
            status:        'pending',
        })

        // Add to bull queue
        const job = await reelQueue.add(
            { reelId: reel._id.toString(), userId: user._id.toString() },
            {
                attempts: 3, // retry 3 times on failure
                backoff: { type: 'exponential', delay: 5000 },
                removeOnComplete: 100,     // keep last 100 completed jobs
                removeOnFail:     50,
            }
        )

        // Save job ID to reel
        reel.jobId = job.id.toString();
        await reel.save();

        res.status(201).json({
            success: true,
            message: 'Reel generation started!',
            reelId: reel._id,
            jobId:  job.id,
            status: 'pending',
            estimatedTime: '90-120 seconds',
        })

    } catch (err) {
        console.log('Generate error:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to start generation. Please try again.',
        })
    }
}


module.exports = { generateReel };