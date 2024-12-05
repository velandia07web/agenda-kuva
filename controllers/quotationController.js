const { matchedData } = require('express-validator');
const quotationService = require('../services/quotationService');

const createQuotation = async (req, res) => {
    try {
        const quotation = await quotationService.createQuotation(req.body);

        return res.status(201).json({
            status: 201,
            message: 'Quotation created successfully',
            data: quotation
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error creating quotation',
            error: error.message
        });
    }
};

const getQuotation = async function (req, res) {
    try {
        const quotation = await quotationService.getOneQuotation(req.params.id)

        if (!quotation) {
            return res.status(404).json({ status: 404, message: 'Cotizacion no encontrada.' })
        } else {
            return res.status(200).json({ status: 200, message: 'Cotizacion por ID:', data: quotation })
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error al obtener la cotizacion.', error: error.message })
    }
}

const getAllQuotation = async function (req, res) {
    try {
        const quotations = await quotationService.getAllQuotations();

        if (!quotations || quotations.length === 0) {
            return res.status(404).json({ status: 404, message: 'No se encontraron cotizaciones.' });
        } else {
            return res.status(200).json({ status: 200, message: 'Lista de cotizaciones:', data: quotations });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error al obtener las cotizaciones.', error: error.message });
    }
}

const updateQuotation = async function (req, res) {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const quotation = await quotationService.updateQuotation(id, updatedData);

        if (!quotation) {
            return res.status(404).json({ status: 404, message: 'Cotización no encontrada.' });
        } else {
            return res.status(200).json({ status: 200, message: 'Cotización actualizada exitosamente.', data: quotation });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error al actualizar la cotización.', error: error.message });
    }
}

const inactivateQuotation = async function (req, res) {
    try {
        const { id } = req.params;

        const quotation = await quotationService.inactivateQuotation(id);

        if (!quotation) {
            return res.status(404).json({ status: 404, message: 'Cotización no encontrada.' });
        } else {
            return res.status(200).json({ status: 200, message: 'Cotización desactivada exitosamente.', data: quotation });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error al desactivar la cotización.', error: error.message });
    }
}

const getQuotationsByState = async function (req, res) {
    try {
        const { state } = req.params;
        const quotations = await quotationService.getQuotationsByState(state);

        if (!quotations || quotations.length === 0) {
            return res.status(404).json({ status: 404, message: `No se encontraron cotizaciones con el estado '${state}'.` });
        } else {
            return res.status(200).json({ status: 200, message: `Lista de cotizaciones con estado '${state}':`, data: quotations });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error al obtener las cotizaciones por estado.', error: error.message });
    }
}

module.exports = {
    createQuotation,
    getQuotation,
    getAllQuotation,
    updateQuotation,
    inactivateQuotation,
    getQuotationsByState
};