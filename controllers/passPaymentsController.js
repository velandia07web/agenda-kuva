const passPaymentsService = require('../services/passPaymentsService');

const createPassPayment = async (req, res) => {
    try {
        const passPayment = await passPaymentsService.createPassPayment(req.body);
        return res.status(201).json({
            status: 201,
            message: 'PassPayment creado con éxito',
            data: passPayment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al crear el PassPayment',
            error: error.message
        });
    }
};

const getPassPayment = async (req, res) => {
    try {
        const passPayment = await passPaymentsService.getPassPaymentById(req.params.id);
        if (!passPayment) {
            return res.status(404).json({
                status: 404,
                message: 'PassPayment no encontrado'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'PassPayment obtenido con éxito',
            data: passPayment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener el PassPayment',
            error: error.message
        });
    }
};

const updatePassPayment = async (req, res) => {
    try {
        const updatedPassPayment = await passPaymentsService.updatePassPayment(req.params.id, req.body);
        return res.status(200).json({
            status: 200,
            message: 'PassPayment actualizado con éxito',
            data: updatedPassPayment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar el PassPayment',
            error: error.message
        });
    }
};

const deletePassPayment = async (req, res) => {
    try {
        await passPaymentsService.deletePassPayment(req.params.id);
        return res.status(200).json({
            status: 200,
            message: 'PassPayment eliminado con éxito'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar el PassPayment',
            error: error.message
        });
    }
};

module.exports = {
    createPassPayment,
    getPassPayment,
    updatePassPayment,
    deletePassPayment
};
