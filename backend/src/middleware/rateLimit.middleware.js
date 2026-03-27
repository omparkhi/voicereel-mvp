const rateLimit = require("express-rate-limit");

// generate API rate limit
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100,
    message: {
        success: false,
        message: 'Too many requests. Please try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: true,
})

// Auth rate limit — prevent brute force
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // only 10 login attempts per 15 mins
    message: {
        success: false,
        message: 'Too many login attempts. Please wait 15 minutes.',
    },
})

// Generate rate limit — prevent abuse
const generateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 generate requests per minute
  message: {
    success: false,
    message: 'Generating too fast. Please wait a moment.',
  },
})

module.exports = { generalLimiter, authLimiter, generateLimiter }