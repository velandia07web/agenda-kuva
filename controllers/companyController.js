const { matchedData } = require('express-validator');
const companyService = require('../services/companyService');

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companyService.getAllCompanies();
        return res.status(200).json({ status: 200, data: companies });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
};

const getOneCompany = async (req, res) => {
    try {
        const company = await companyService.getOneCompany(req.params.id);
        if (company) {
            return res.status(200).json({ status: 200, data: company });
        } else {
            return res.status(404).json({ status: 404, message: 'Empresa no encontrada' });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
};

const createCompany = async (req, res) => {
    try {
        const validData = matchedData(req);
        const newCompany = await companyService.createCompany(validData);
        return res.status(201).json({ status: 201, data: newCompany });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
};

const updateCompany = async (req, res) => {
    try {
        const validData = matchedData(req);
        const updatedCompany = await companyService.updateCompany(req.params.id, validData);
        return res.status(200).json({ status: 200, data: updatedCompany });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
};

const deleteCompany = async (id) => {
    try {
        const company = await Company.findOne({ where: { id } });

        if (!company) {
            throw new Error(`Empresa con id ${id} no encontrada`);
        }

        const newState = company.state === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

        const updatedCount = await Company.update(
            { state: newState },
            { where: { id } }
        );

        if (updatedCount[0] === 0) {
            throw new Error(`No se pudo actualizar el estado de la empresa con id ${id}`);
        }

        return { id, newState };
    } catch (error) {
        throw new Error(`Error al alternar el estado de la empresa: ${error.message}`);
    }
};

module.exports = {
    getAllCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
    deleteCompany,
};