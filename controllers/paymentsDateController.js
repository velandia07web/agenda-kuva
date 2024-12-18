const paymentsDateService = require('../services/paymentsDateService');

const createPaymentsDate = async (req, res) => {
    try {
        const paymentsDate = await paymentsDateService.createPaymentsDate(req.body);
        return res.status(201).json({
            status: 201,
            message: 'PaymentsDate creado con éxito',
            data: paymentsDate
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al crear PaymentsDate',
            error: error.message
        });
    }
};

const getPaymentsDate = async (req, res) => {
    try {
        const paymentsDate = await paymentsDateService.getPaymentsDateById(req.params.id);
        if (!paymentsDate) {
            return res.status(404).json({
                status: 404,
                message: 'PaymentsDate no encontrado'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'PaymentsDate obtenido con éxito',
            data: paymentsDate
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener PaymentsDate',
            error: error.message
        });
    }
};

const getAllPaymentsDates = async (req, res) => {
    try {
        const paymentsDates = await paymentsDateService.getAllPaymentsDates();
        return res.status(200).json({
            status: 200,
            message: 'PaymentsDates obtenidos con éxito',
            data: paymentsDates
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener PaymentsDates',
            error: error.message
        });
    }
};

const updatePaymentsDate = async (req, res) => {
    try {
        const updatedPaymentsDate = await paymentsDateService.updatePaymentsDate(req.params.id, req.body);
        return res.status(200).json({
            status: 200,
            message: 'PaymentsDate actualizado con éxito',
            data: updatedPaymentsDate
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar PaymentsDate',
            error: error.message
        });
    }
};

const deletePaymentsDate = async (req, res) => {
    try {
        await paymentsDateService.deletePaymentsDate(req.params.id);
        return res.status(200).json({
            status: 200,
            message: 'PaymentsDate eliminado con éxito'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar PaymentsDate',
            error: error.message
        });
    }
};

module.exports = {
    createPaymentsDate,
    getPaymentsDate,
    getAllPaymentsDates,
    updatePaymentsDate,
    deletePaymentsDate
};
