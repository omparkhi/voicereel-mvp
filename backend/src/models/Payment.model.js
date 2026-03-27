const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true,
    },
    razorpayPaymentId: {
        type: String, // filled after success
    },
    razorpaySignature: {
        type: String, // filled after verification
    },
    amount: {
        type: Number, // in paise — Rs.499 = 49900
        required: true,
    },
    credits: {
        type: Number, // credits to add on success
        required: true,
    },
    plan: {
        type: String, // plan name purchased
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Payment', paymentSchema)