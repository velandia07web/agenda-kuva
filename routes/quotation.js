const express = require('express');
const { Quotation, Sale } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { createQuotation,sendQuotationEmail, getQuotation, getAllQuotation,updateQuotation,inactivateQuotation,getQuotationsByState, sendQuotationEmailOne} = require('../controllers/quotationController');
const authMiddlewareRol = require("../middlewares/sessionRol");
const router = express.Router();



router.post('/quotations',createQuotation)
      .get('/',getAllQuotation)
      .get('/email/:id', sendQuotationEmail)
      .get('/:id',  getQuotation)
      .get('/state/:state',  getQuotationsByState)
      .post('/quotations/email/:id', sendQuotationEmailOne)
      .delete('/:id',  inactivateQuotation);


      router.get('/:id/respond', async (req, res) => {
        try {
            const { id } = req.params;
            const { response } = req.query;
    
            if (!['Aprobado', 'Rechazada'].includes(response)) {
                return res.status(400).json({ error: 'Estado invalido.' });
            }
    
            const quotation = await Quotation.findByPk(id);
            if (!quotation) {
                return res.status(404).json({ error: 'Cotización no encontrada.' });
            }
    
            quotation.state = response;
            await quotation.save();

            if (response === 'Aprobado') {
                const sale = await Sale.create({
                    id: uuidv4(),
                    idQuotation: id,
                    state: 'venta sin completar', 
                    etapa: 'ACTIVO',
                    createdAt: new Date(), 
                    updatedAt: new Date(),
                });
    
                return res.send(`<h1>Cotización ${response} creada correctamente el ID de venta: ${sale.id}</h1>`);
            }
    
            res.send(`<h1>Cotización ${response}  correctamente!</h1>`);
        } catch (error) {
            console.error(error);
            res.status(500).send('<h1>Ha ocurrido un error.</h1>');
        }
    });

router.put('/:id',  updateQuotation)
      

module.exports = router;