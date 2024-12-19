const { Pass , PassPayment, sequelize } = require('../models');

const createPass = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        let pass = await Pass.findOne({
            where: { quotationId: data.quotationId },
        });

        if (!pass) {
            pass = await Pass.create({
                quotationId: data.quotationId,
            }, { transaction });
        }

        const paymentData = {
            idPass: pass.id,
            payment: data.payment,
            file: data.file,
        };

        await PassPayment.create(paymentData, { transaction });
        await transaction.commit();

        return { pass, payment: paymentData };
    } catch (error) {
        await transaction.rollback();
        throw new Error(`Error al crear o actualizar el Pass: ${error.message}`);
    }
};

const getPassById = async (quotationId) => {
    return await Pass.findOne({
        where: { quotationId },
        include: [
            {
                model: PassPayment,
                as: 'PassPayments',
            },
        ],
    });
};

const getAllPasses = async () => {
    return await Pass.findAll({
        include: [
            {
                model: PassPayment,
                as: 'PassPayments',
            },
        ],
    });
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
