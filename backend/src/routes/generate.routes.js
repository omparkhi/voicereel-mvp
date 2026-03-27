const express = require("express");
const router = express.Router();
const { generateReel } = require("../controllers/generate.controller");
const authMiddleware = require("../middleware/auth.middleware");
const creditCheckMiddleware = require("../middleware/creditCheck.middleware");
const { generalLimiter } = require("../middleware/rateLimit.middleware"); 

router.post("/reel", authMiddleware, creditCheckMiddleware, generalLimiter, generateReel);

module.exports = router;