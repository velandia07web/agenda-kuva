const invoicesService = require('../services/invoicesService');

const createInvoice = async (req, res) => {
    try {
        const invoice = await invoicesService.createInvoice(req.body);
        return res.status(201).json({
            status: 201,
            message: 'Factura creada con éxito',
            data: invoice
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al crear la factura',
            error: error.message
        });
    }
};

const getInvoice = async (req, res) => {
    try {
        const invoice = await invoicesService.getInvoiceById(req.params.id);
        if (!invoice) {
            return res.status(404).json({
                status: 404,
                message: 'Factura no encontrada'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Factura obtenida con éxito',
            data: invoice
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener la factura',
            error: error.message
        });
    }
};

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoicesService.getAllInvoices();
        return res.status(200).json({
            status: 200,
            message: 'Facturas obtenidas con éxito',
            data: invoices
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener las facturas',
            error: error.message
        });
    }
};

const updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await invoicesService.updateInvoice(req.params.id, req.body);
        return res.status(200).json({
            status: 200,
            message: 'Factura actualizada con éxito',
            data: updatedInvoice
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar la factura',
            error: error.message
        });
    }
};

const deleteInvoice = async (req, res) => {
    try {
        await invoicesService.deleteInvoice(req.params.id);
        return res.status(200).json({
            status: 200,
            message: 'Factura eliminada con éxito'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar la factura',
            error: error.message
        });
    }
};

module.exports = {
    createInvoice,
    getInvoice,
    getAllInvoices,
    updateInvoice,
    deleteInvoice
};
