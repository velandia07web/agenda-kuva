const { matchedData } = require('express-validator');
const cabinService = require('../services/cabinService');

const getAllCabins = async function (req, res) {
    try {
        const cabins = await cabinService.getAllCabins();
        return res.status(200).json({
            status: 200,
            message: 'Cabinas:',
            data: cabins
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener las cabinas.',
            error: error.message
        });
    }
};

const getOneCabin = async function (req, res) {
    try {
        const cabin = await cabinService.getOneCabin(req.params.id);

        if (!cabin) {
            return res.status(404).json({
                status: 404,
                message: 'Cabina no encontrada.'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Cabina por ID:',
            data: cabin
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener la cabina por ID.',
            error: error.message
        });
    }
};

const createCabin = async function (req, res) {
    try {
        const validData = matchedData(req);
        const createdCabin = await cabinService.createCabin(validData);
        return res.status(201).json({
            status: 201,
            message: 'Cabina creada satisfactoriamente',
            data: createdCabin
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al crear la cabina.',
            error: error.message
        });
    }
};

const updateCabin = async function (req, res) {
    try {
        const idCabin = req.params.id;

        if (!idCabin) {
            return res.status(404).json({
                status: 404,
                message: 'Cabina no encontrada.'
            });
        }

        const validData = matchedData(req);

        const updatedCabin = await cabinService.updateCabin(idCabin, validData);
        return res.status(200).json({
            status: 200,
            message: 'Cabina actualizada satisfactoriamente',
            data: updatedCabin
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar la cabina.',
            error: error.message
        });
    }
};

const deleteCabin = async function (req, res) {
    try {
        const deletedCabin = await cabinService.deleteCabin(req.params.id);
        if (deletedCabin) {
            return res.status(200).json({
                status: 200,
                message: 'Cabina eliminada satisfactoriamente',
                data: deletedCabin
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: 'Cabina no encontrada.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar la cabina.',
            error: error.message
        });
    }
};

module.exports = {
    getAllCabins,
    getOneCabin,
    createCabin,
    updateCabin,
    deleteCabin
};