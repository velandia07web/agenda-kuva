const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/generate', notificationController.generateNotifications);
router.post('/generate-payments', notificationController.generateNotificationsPayments);
router.get('/all', notificationController.getAllNotifications);
router.get('/user/:userId', notificationController.getNotificationsByUserId);

module.exports = router;
