const express = require('express');
const { Quotation } = require('../models');
const { createQuotation,sendQuotationEmail, getQuotation, getAllQuotation,updateQuotation,inactivateQuotation,getQuotationsByState} = require('../controllers/quotationController');
const authMiddlewareRol = require("../middlewares/sessionRol");
const router = express.Router();



router.post('/quotations',createQuotation)
      .get('/',getAllQuotation)
      .get('/email/:id', sendQuotationEmail)
      .get('/:id',  getQuotation)
      .get('/state/:state',  getQuotationsByState);


router.get('/:id/respond', async (req, res) => {
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

router.put('/:id',  updateQuotation)
      .patch('/:id/inactivate',  inactivateQuotation);

module.exports = router;