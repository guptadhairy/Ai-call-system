const express = require('express');
const userRoutes = require('./userRoutes');
const callRoutes = require('./callRoutes');
const webhookRoutes = require('./webhookRoutes');
const constants = require('../utils/constants');

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// API routes
router.use('/users', userRoutes);
router.use('/calls', callRoutes);
router.use('/webhook', webhookRoutes);

module.exports = router; 