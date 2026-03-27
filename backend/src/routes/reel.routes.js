const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { getReelStatus, getDownloadUrl, getCredits, listReels, deleteReel,  } = require("../controllers/reel.controller");


router.get("/reel/:id/status", authMiddleware, getReelStatus);
router.get("/reel/:id/download", authMiddleware, getDownloadUrl);
router.get('/reels',             authMiddleware, listReels);
router.delete('/reel/:id',       authMiddleware, deleteReel);
router.get('/credits',           authMiddleware, getCredits);

module.exports = router;