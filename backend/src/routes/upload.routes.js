const express = require("express");
const router = express.Router();
const { uploadPhoto } = require("../controllers/upload.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/photo", authMiddleware, uploadPhoto);

module.exports = router;