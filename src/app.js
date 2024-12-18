require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const logger = require('./config/logger');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const limiter = require('./config/rateLimiter');
const { helmetConfig, compressionConfig, cookieParserConfig } = require('./middleware/security');
const config = require('./config/config');
const constants = require('./utils/constants');
const mongoose = require('mongoose');
const { testTwilioConnection } = require('./config/twilio');

const app = express();

// Connect to MongoDB
connectDB();

// Test Twilio connection
testTwilioConnection()
  .then(connected => {
    if (connected) {
      logger.info('Twilio integration ready');
    } else {
      logger.warn('Twilio integration not available');
    }
  });

// Security Middleware
app.use(helmetConfig);
app.use(compressionConfig);
app.use(cookieParserConfig);
app.use(cors());
app.use(express.json());

// Rate Limiting
app.use(limiter);

// API Documentation
app.use(constants.ROUTES.DOCS, swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
const apiRouter = require('./routes/index');
app.use('/api', apiRouter);

// Basic health check route
app.get('/api/health', (req, res) => {
  logger.info('Health check endpoint called');
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: config.env
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  logger.info(`API Documentation available at ${constants.ROUTES.DOCS}`);
});

module.exports = app; 