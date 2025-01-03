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
                return res.status(400).send(`
                    <div style="font-family: Arial, sans-serif; text-align: center; margin: 50px auto; max-width: 600px; color: #333;">
                        <h1 style="color: red;">Error</h1>
                        <p>Estado inválido. Solo se permiten las opciones <strong>Aprobado</strong> o <strong>Rechazada</strong>.</p>
                    </div>
                `);
            }
    
            const quotation = await Quotation.findByPk(id);
            if (!quotation) {
                return res.status(404).send(`
                    <div style="font-family: Arial, sans-serif; text-align: center; margin: 50px auto; max-width: 600px; color: #333;">
                        <h1 style="color: red;">Error</h1>
                        <p>No se encontró la cotización con el ID: <strong>${id}</strong>.</p>
                        <p>Cierre la pestaña y vuelva a la lista de cotizaciones.</p>
                    </div>
                `);
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
    
                return res.send(`
                    <div style="font-family: Arial, sans-serif; text-align: center; margin: 50px auto; max-width: 600px; color: #333;">
                        <h1 style="color: green;">Cotización Aprobada</h1>
                        <p>La cotización ha sido aprobada exitosamente.</p>
                        <p>ID de la nueva venta: <strong>${sale.id}</strong></p>
                        <p>Cierre la pestaña y vuelva a la lista de cotizaciones.</p>
                    </div>
                `);
            }
    
            res.send(`
                <div style="font-family: Arial, sans-serif; text-align: center; margin: 50px auto; max-width: 600px; color: #333;">
                    <h1 style="color: orange;">Cotización ${response}</h1>
                    <p>La cotización ha sido <strong>${response.toLowerCase()}</strong> correctamente.</p>
                    <p>Cierre la pestaña y vuelva a la lista de cotizaciones.</p>
                </div>
            `);
        } catch (error) {
            console.error(error);
            res.status(500).send(`
                <div style="font-family: Arial, sans-serif; text-align: center; margin: 50px auto; max-width: 600px; color: #333;">
                    <h1 style="color: red;">Error</h1>
                    <p>Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.</p>
                    <p>Cierre la pestaña y vuelva a la lista de cotizaciones.</p>
                </div>
            `);
        }
    });

router.put('/:id',  updateQuotation)
      

module.exports = router;