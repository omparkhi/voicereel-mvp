const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// signup
async function signup(req, res) {
    try {
        const { name, email, password, segment } = req.body;

        // validate
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and password are required',
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters',
            })
        }

        // Check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if(existing) {
            return res.status(409).json({
                success: false,
                message: "Account already exists with this email, Try Login!"
            })
        }

        // hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // create user
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            passwordHash,
            segment: segment || "smb",
            credits: 3, // 3 free credits
            plan: "free",
        })

        // generate jwt
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        )

        res.status(201).json({
            success: true,
            message: 'Account created! 3 free credits added.',
            token,
            user: user.toJSON(),
        })
    } catch (err) {
        console.error('Signup error:', err.message)
        res.status(500).json({
            success: false,
            message: 'Failed to create account. Please try again.',
        })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            })
        }

        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        // generate jwt
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        )

        res.json({
            success: true,
            message: 'Logged in successfully',
            token,
            user: user.toJSON(),
        })
    } catch (err) {
        console.error('Login error:', err.message)
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.',
        })
    }
}


async function getMe(req, res) {
  try {
    res.json({
      success: true,
      user: req.user.toJSON(),
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get user' })
  }
}

module.exports = { signup, login, getMe }