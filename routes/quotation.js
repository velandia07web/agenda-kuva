const express = require('express');
const { Quotation } = require('../models');
const { createQuotation,sendQuotationEmail, getQuotation, getAllQuotation,updateQuotation,inactivateQuotation,getQuotationsByState} = require('../controllers/quotationController');
const authMiddlewareRol = require("../middlewares/sessionRol");
const router = express.Router();

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))



router.post('/quotations', authMiddlewareRol(['Comercial', 'Superadministrador']), createQuotation)
      .get('/email/:id', authMiddlewareRol(['Comercial']), sendQuotationEmail)
      .get('/:id', authMiddlewareRol(['Comercial']), getQuotation)
      .get('/', authMiddlewareRol(['Comercial']), getAllQuotation)
      .get('/state/:state', authMiddlewareRol(['Comercial']), getQuotationsByState);


router.get('/:id/respond', authMiddlewareRol(['Comercial']), async (req, res) => {
    try {
        const { id } = req.params;
        const { response } = req.query;

        if (!['approved', 'rejected'].includes(response)) {
            return res.status(400).json({ error: 'Invalid response value.' });
        }

        const quotation = await Quotation.findByPk(id);
        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found.' });
        }

        quotation.state = response;
        await quotation.save();

        res.send(`<h1>Quotation ${response} successfully!</h1>`);
    } catch (error) {
        console.error(error);
        res.status(500).send('<h1>An error occurred while processing the response.</h1>');
    }
});

router.put('/:id', authMiddlewareRol(['Comercial']), updateQuotation)
      .patch('/:id/inactivate', authMiddlewareRol(['Comercial']), inactivateQuotation);

module.exports = router;