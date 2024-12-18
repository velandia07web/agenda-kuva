const express = require('express');
const {
    createPaymentsDate,
    getPaymentsDate,
    getAllPaymentsDates,
    updatePaymentsDate,
    deletePaymentsDate
} = require('../controllers/paymentsDateController');

const router = express.Router();

router.post('/', createPaymentsDate);
router.get('/:id', getPaymentsDate);
router.get('/', getAllPaymentsDates);
router.put('/:id', updatePaymentsDate);
router.delete('/:id', deletePaymentsDate);

module.exports = router;
