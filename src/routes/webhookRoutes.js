const express = require('express');
const router = express.Router();
const twilio = require('twilio');

router.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  
  twiml.say('Hello! This is a test call from your AI Call System.');
  
  res.type('text/xml');
  res.send(twiml.toString());
});

module.exports = router; 