const { PaymentsDate } = require('../models');

const createPaymentsDate = async (data) => {
    return await PaymentsDate.create(data);
};

const getPaymentsDateById = async (id) => {
    return await PaymentsDate.findByPk(id);
};

const getAllPaymentsDates = async () => {
    return await PaymentsDate.findAll();
};

const updatePaymentsDate = async (id, data) => {
    const paymentsDate = await PaymentsDate.findByPk(id);
    if (!paymentsDate) {
        throw new Error('PaymentsDate no encontrado');
    }
    return await paymentsDate.update(data);
};

const deletePaymentsDate = async (id) => {
    const paymentsDate = await PaymentsDate.findByPk(id);
    if (!paymentsDate) {
        throw new Error('PaymentsDate no encontrado');
    }
    await paymentsDate.destroy();
};

module.exports = {
    createPaymentsDate,
    getPaymentsDateById,
    getAllPaymentsDates,
    updatePaymentsDate,
    deletePaymentsDate
};
