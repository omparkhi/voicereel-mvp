require('dotenv').config();

const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes");
const uploadRoutes   = require('./routes/upload.routes');
const generateRoutes = require('./routes/generate.routes')
const reelRoutes     = require('./routes/reel.routes')
// const paymentRoutes  = require('./routes/payment.routes')


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use('/api/upload',  uploadRoutes);
app.use('/api/generate',generateRoutes)
app.use('/api',         reelRoutes)
// app.use('/api/payment', paymentRoutes)

app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error('Error:', err.message)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
    })
})

async function startServer() {
    try {
        // console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        // start bull worker
        // require("./workers/reelJob.worker");
        // console.log('✅ Job worker started')

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);   
        })
    } catch (err) {
        console.error('❌ Failed to start:', err.message)
        process.exit(1)
    }
}

startServer();