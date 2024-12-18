const ApiResponse = require('../utils/apiResponse');
const constants = require('../utils/constants');

const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return ApiResponse.error(
      res,
      'Name and email are required',
      constants.STATUS_CODES.BAD_REQUEST
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return ApiResponse.error(
      res,
      'Invalid email format',
      constants.STATUS_CODES.BAD_REQUEST
    );
  }

  next();
};

module.exports = {
  validateUser
}; 