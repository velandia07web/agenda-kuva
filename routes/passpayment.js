const express = require('express');
const {
    createPassPayment,
    getPassPayment,
    updatePassPayment,
    deletePassPayment
} = require('../controllers/passPaymentsController');

const router = express.Router();

router.post('/', createPassPayment);
router.get('/:id', getPassPayment);
router.put('/:id', updatePassPayment);
router.delete('/:id', deletePassPayment);

module.exports = router;
