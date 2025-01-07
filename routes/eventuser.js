const express = require('express');
const router = express.Router();
const { deleteEventUser, getUsersNotInEvent } = require('../controllers/eventUserController');

router.delete('/:eventId/:userId', deleteEventUser);
router.get('/not-in-event/:eventId', getUsersNotInEvent);

module.exports = router;
