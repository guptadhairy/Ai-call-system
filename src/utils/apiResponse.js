const constants = require('./constants');

class ApiResponse {
  static success(res, data, message = 'Success', statusCode = constants.STATUS_CODES.SUCCESS) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static error(res, message = constants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, statusCode = constants.STATUS_CODES.INTERNAL_ERROR) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }
}

module.exports = ApiResponse; 