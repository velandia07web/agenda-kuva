const express = require('express');
const {
    createVenta,
    getVenta,
    getAllVentas,
    updateVenta,
    deleteVenta
} = require('../controllers/salesController');

const router = express.Router();

router.post('/ventas', createVenta);
router.get('/:id', getVenta);
router.get('/', getAllVentas);
router.put('/:id', updateVenta);
router.delete('/:id', deleteVenta);

module.exports = router;