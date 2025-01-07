const express = require('express');
const router = express.Router();
const { deleteEventUser } = require('../controllers/eventUserController');

router.delete('/:eventId/:userId', deleteEventUser);

module.exports = router;
