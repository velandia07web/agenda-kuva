const { Pass } = require('../models');

const createPass = async (data) => {
    return await Pass.create(data);
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
