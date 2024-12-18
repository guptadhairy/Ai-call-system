const { twilioConfig } = require('../config/twilio');
const logger = require('../config/logger');
const AppError = require('../utils/AppError');
const constants = require('../utils/constants');

class CallService {
  constructor() {
    this.client = twilioConfig.client;
    this.phoneNumber = twilioConfig.phoneNumber;
  }

  // Make a call
  async makeCall(to, twimlUrl) {
    try {
      const call = await this.client.calls.create({
        to,
        from: this.phoneNumber,
        url: twimlUrl,
      });
      
      logger.info(`Call initiated with SID: ${call.sid}`);
      return call;
    } catch (error) {
      logger.error('Error making call:', error);
      throw new AppError('Failed to initiate call', constants.STATUS_CODES.INTERNAL_ERROR);
    }
  }

  // Get call status
  async getCallStatus(callSid) {
    try {
      const call = await this.client.calls(callSid).fetch();
      return call.status;
    } catch (error) {
      logger.error('Error getting call status:', error);
      throw new AppError('Failed to get call status', constants.STATUS_CODES.INTERNAL_ERROR);
    }
  }

  // End call
  async endCall(callSid) {
    try {
      await this.client.calls(callSid)
        .update({ status: 'completed' });
      logger.info(`Call ${callSid} ended`);
      return true;
    } catch (error) {
      logger.error('Error ending call:', error);
      throw new AppError('Failed to end call', constants.STATUS_CODES.INTERNAL_ERROR);
    }
  }
}

module.exports = new CallService(); 