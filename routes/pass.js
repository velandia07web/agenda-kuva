const express = require('express');
const {
    createPass,
    getPass,
    getAllPasses,
    updatePass,
    deletePass
} = require('../controllers/passController');

const router = express.Router();

router.post('/', createPass);
router.get('/:id', getPass);
router.get('/', getAllPasses);
router.put('/:id', updatePass);
router.delete('/:id', deletePass);

module.exports = router;
