const { Pass , PassPayment} = require('../models');

const createPass = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const pass = await Pass.create({
            quotationId: data.quotationId,
        }, { transaction });

        const paymentsData = data.payments.map(payment => ({
            idPass: pass.id,
            payment,
        }));

        await PassPayment.bulkCreate(paymentsData, { transaction });

        await transaction.commit();

        return { pass, payments: paymentsData };
    } catch (error) {
        await transaction.rollback();
        throw new Error(`Error al crear el Pass y los pagos: ${error.message}`);
    }
};

const getPassById = async (id) => {
    return await Pass.findByPk(id);
};

const getAllPasses = async () => {
    return await Pass.findAll();
};

const updatePass = async (id, data) => {
    const pass = await Pass.findByPk(id);
    if (!pass) {
        throw new Error('Pase no encontrado');
    }
    return await pass.update(data);
};

const deletePass = async (id) => {
    const pass = await Pass.findByPk(id);
    if (!pass) {
        throw new Error('Pase no encontrado');
    }
    await pass.destroy();
};

module.exports = {
    createPass,
    getPassById,
    getAllPasses,
    updatePass,
    deletePass
};
