// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static frontend files (index.html, etc.)
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

// Optional MongoDB connection
if (process.env.MONGO_URI && !process.env.MONGO_URI.includes('your_mongodb_connection_string')) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err.message));
} else {
    console.log('Notice: MONGO_URI not configured or using placeholder. Update .env to persist bookings to MongoDB.');
}

// Payment API routes
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: "ok",
        message: "WanderWise Backend is running successfully!",
        endpoints: {
            createOrder: "POST /api/payment/create-order",
            verifyPayment: "POST /api/payment/verify-payment"
        }
    });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`  WanderWise running at http://localhost:${PORT}`);
    console.log(`  API Health at http://localhost:${PORT}/api/health`);
    console.log(`===============================================`);
});
