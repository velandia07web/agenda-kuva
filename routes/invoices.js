const express = require('express');
const {
    createInvoice,
    getInvoice,
    updateInvoice,
    deleteInvoice,
    getAllInvoices
} = require('../controllers/invoicesController');

const router = express.Router();

router.post('/', createInvoice);
router.get('/:id', getInvoice);
router.get('/', getAllInvoices);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;
    