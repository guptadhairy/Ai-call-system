const rateLimit = require('express-rate-limit');
const constants = require('../utils/constants');
const ApiResponse = require('../utils/apiResponse');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    return ApiResponse.error(
      res,
      'Too many requests, please try again later.',
      constants.STATUS_CODES.TOO_MANY_REQUESTS
    );
  }
});

module.exports = limiter; 