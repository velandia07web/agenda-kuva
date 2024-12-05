const ventasService = require('../services/salesService');

const createVenta = async (req, res) => {
    try {
        const venta = await ventasService.createVenta(req.body);
        return res.status(201).json({
            status: 201,
            message: 'Venta creada exitosamente',
            data: venta
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al crear la venta',
            error: error.message
        });
    }
};

const getVenta = async (req, res) => {
    try {
        const venta = await ventasService.getVentaById(req.params.id);
        if (!venta) {
            return res.status(404).json({
                status: 404,
                message: 'Venta no encontrada'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Venta obtenida con éxito',
            data: venta
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener la venta',
            error: error.message
        });
    }
};

const getAllVentas = async (req, res) => {
    try {
        const ventas = await ventasService.getAllVentas();
        return res.status(200).json({
            status: 200,
            message: 'Lista de ventas obtenida exitosamente',
            data: ventas
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener las ventas',
            error: error.message
        });
    }
};

const updateVenta = async (req, res) => {
    try {
        const venta = await ventasService.updateVenta(req.params.id, req.body);
        if (!venta) {
            return res.status(404).json({
                status: 404,
                message: 'Venta no encontrada'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Venta actualizada exitosamente',
            data: venta
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar la venta',
            error: error.message
        });
    }
};

const deleteVenta = async (req, res) => {
    try {
        const venta = await ventasService.deleteVenta(req.params.id);
        if (!venta) {
            return res.status(404).json({
                status: 404,
                message: 'Venta no encontrada'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Venta eliminada exitosamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar la venta',
            error: error.message
        });
    }
};

module.exports = {
    createVenta,
    getVenta,
    getAllVentas,
    updateVenta,
    deleteVenta
};