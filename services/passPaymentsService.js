const { PassPayment } = require('../models');

const createPassPayment = async (data) => {
    return await PassPayment.create(data);
};

const getPassPaymentById = async (id) => {
    return await PassPayment.findByPk(id);
};

const updatePassPayment = async (id, data) => {
    const passPayment = await PassPayment.findByPk(id);
    if (!passPayment) {
        throw new Error('PassPayment no encontrado');
    }
    return await passPayment.update(data);
};

const deletePassPayment = async (id) => {
    const passPayment = await PassPayment.findByPk(id);
    if (!passPayment) {
        throw new Error('PassPayment no encontrado');
    }
    await passPayment.destroy();
};

module.exports = {
    createPassPayment,
    getPassPaymentById,
    updatePassPayment,
    deletePassPayment
};
