
const express = require('express');
const { 
    getAllEvents, 
    getEventById,
    updateEventById
} = require('../controllers/eventController');
const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEventById);

module.exports = router;