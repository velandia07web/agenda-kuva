const { Invoice } = require('../models');

const createInvoice = async (data) => {
    return await Invoice.create(data);
};

const getInvoiceById = async (id) => {
    return await Invoice.findByPk(id);
};

const getAllInvoices = async () => {
    return await Invoice.findAll();
};

const updateInvoice = async (id, data) => {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
        throw new Error('Factura no encontrada');
    }
    return await invoice.update(data);
};

const deleteInvoice = async (id) => {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
        throw new Error('Factura no encontrada');
    }
    await invoice.destroy();
};

module.exports = {
    createInvoice,
    getInvoiceById,
    getAllInvoices,
    updateInvoice,
    deleteInvoice
};
