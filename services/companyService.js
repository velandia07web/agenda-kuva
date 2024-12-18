const { Company } = require('../models');

const getAllCompanies = async () => {
    try {
        return await Company.findAndCountAll({
            order: [['name', 'ASC']],
        });
    } catch (error) {
        throw new Error(`Error al obtener las empresas: ${error.message}`);
    }
};

const getOneCompany = async (id) => {
    try {
        return await Company.findOne({ where: { id } });
    } catch (error) {
        throw new Error(`Error al obtener la empresa: ${error.message}`);
    }
};

const createCompany = async (body) => {
    try {
        const companyData = { ...body, state: "ACTIVO" };
        return await Company.create(companyData);
    } catch (error) {
        throw new Error(`Error al crear la empresa: ${error.message}`);
    }
};

const updateCompany = async (id, body) => {
    try {
        const [updatedRows] = await Company.update(body, { where: { id } });
        if (!updatedRows) throw new Error(`Empresa con id ${id} no encontrada`);
        return updatedRows;
    } catch (error) {
        throw new Error(`Error al actualizar la empresa: ${error.message}`);
    }
};

const deleteCompany = async (id) => {
    try {
        const deletedCount = await Company.destroy({ where: { id } });
        if (!deletedCount) throw new Error(`Empresa con id ${id} no encontrada`);
        return deletedCount;
    } catch (error) {
        throw new Error(`Error al eliminar la empresa: ${error.message}`);
    }
};

module.exports = {
    getAllCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
    deleteCompany,
};