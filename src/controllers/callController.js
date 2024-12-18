const callService = require('../services/callService');
const ApiResponse = require('../utils/apiResponse');
const constants = require('../utils/constants');
const logger = require('../config/logger');

const callController = {
  // Initiate a call
  initiateCall: async (req, res) => {
    try {
      const { phoneNumber, twimlUrl } = req.body;
      
      if (!phoneNumber || !twimlUrl) {
        return ApiResponse.error(
          res,
          'Phone number and TwiML URL are required',
          constants.STATUS_CODES.BAD_REQUEST
        );
      }

      const call = await callService.makeCall(phoneNumber, twimlUrl);
      return ApiResponse.success(res, call, 'Call initiated successfully');
    } catch (error) {
      logger.error('Error in initiateCall:', error);
      throw error;
    }
  },

  // Get call status
  getCallStatus: async (req, res) => {
    try {
      const { callSid } = req.params;
      const status = await callService.getCallStatus(callSid);
      return ApiResponse.success(res, { status }, 'Call status retrieved');
    } catch (error) {
      logger.error('Error in getCallStatus:', error);
      throw error;
    }
  },

  // End call
  endCall: async (req, res) => {
    try {
      const { callSid } = req.params;
      await callService.endCall(callSid);
      return ApiResponse.success(res, null, 'Call ended successfully');
    } catch (error) {
      logger.error('Error in endCall:', error);
      throw error;
    }
  }
};

module.exports = callController; 