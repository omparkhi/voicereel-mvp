// Check if user has enough credits before generating
function creditCheckMiddleware(req, res, next) {
    const user = req.user;

    // check credits
    if (user.credits <= 0) {
        return res.status(402).json({
            success: false,
            message: 'No credits remaining. Please top up to continue.',
            credits: 0,
            topUpUrl: '/dashboard/credits',
        })
    }

    next();
}

module.exports = creditCheckMiddleware