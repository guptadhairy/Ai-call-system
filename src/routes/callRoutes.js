const express = require('express');
const callController = require('../controllers/callController');
const router = express.Router();

/**
 * @swagger
 * /api/calls:
 *   post:
 *     summary: Initiate a new call
 *     tags: [Calls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - twimlUrl
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               twimlUrl:
 *                 type: string
 */
router.post('/', callController.initiateCall);

/**
 * @swagger
 * /api/calls/{callSid}/status:
 *   get:
 *     summary: Get call status
 *     tags: [Calls]
 *     parameters:
 *       - in: path
 *         name: callSid
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:callSid/status', callController.getCallStatus);

/**
 * @swagger
 * /api/calls/{callSid}:
 *   delete:
 *     summary: End a call
 *     tags: [Calls]
 *     parameters:
 *       - in: path
 *         name: callSid
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/:callSid', callController.endCall);

module.exports = router; 