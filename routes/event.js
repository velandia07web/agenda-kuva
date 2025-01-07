
const express = require('express');
const { 
    getAllEvents, 
    getEventById,
    updateEventById,
    downloadEventImage,
    upload
} = require('../controllers/eventController');
const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', upload.single('eventImage'), updateEventById);
router.get('/download/:id', downloadEventImage);

module.exports = router;