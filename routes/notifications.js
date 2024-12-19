const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/generate', notificationController.generateNotifications);

module.exports = router;
