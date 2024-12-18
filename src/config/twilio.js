const twilio = require('twilio');
const config = require('./config');
const logger = require('./logger');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const twilioConfig = {
  phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  client: twilioClient
};

// Test Twilio connection
const testTwilioConnection = async () => {
  try {
    await twilioClient.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
    logger.info('Twilio connection successful');
    return true;
  } catch (error) {
    logger.error('Twilio connection failed:', error);
    return false;
  }
};

module.exports = {
  twilioConfig,
  testTwilioConnection
}; 