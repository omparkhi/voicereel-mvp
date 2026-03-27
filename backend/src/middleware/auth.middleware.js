const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

async function authMiddleware(req, res, next) {
    try {
        // get token from header
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please log in.',
            })
        }

        const token = authHeader.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: ""
            })
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (err) {
        if(err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again.",
            })
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token. Please log in.',
        })
    }
}

module.exports = authMiddleware;