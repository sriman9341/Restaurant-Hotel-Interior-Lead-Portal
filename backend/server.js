const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Enable CORS and JSON parsing
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

// Main Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/quotations', require('./routes/quotationRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ success: false, error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
