const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    plan: {
        type: String,
        enum: ['free', 'starter', 'business', 'business_pro', 'creator', 'creator_pro', 'agency'],
        default: 'free',
    },
    credits: {
        type: Number,
        default: 3, // 3 free credits on signup
        min: 0,
    },
    totalCreditsUsed: {
        type: String,
        default: 0,
    },
    segment: {
        type: String,
        enum: ['smb', 'creator'],
        default: 'smb',
    },
    businessName: {
        type: String,
        trim: true,
    },
    profilePhotoUrl: {
        type: String,
    },

    // Phase 2 — Brand kit
    brandKit: {
        logo: String,
        primaryColor: String,
        businessName: String,
    },

    // Phase 3 — Voice clone
    voiceModeId: {
        type: String,
    },

    // Razorpay
    razorpayCustomerId: {
        type: String,
    },
}, {
    timestamps: true,
})

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.passwordHash;
    return user;
}

module.exports = mongoose.model("User", userSchema);