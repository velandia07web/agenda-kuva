const passService = require('../services/passService');
const upload = require('../config/uploadConfig');
const uploadMiddleware = upload.single('file');

const createPass = async (req, res) => {
    try {
        const { quotationId, payment } = req.body;
        const file = req.file ? req.file.path : null;

        if (!quotationId || !payment || !file) {
            throw new Error("Todos los campos (quotationId, payment, file) son obligatorios.");
        }

        const data = {
            quotationId,
            payment: parseFloat(payment),
            file: "",
        };

        const result = await passService.createPass(data);

        res.status(201).json({
            status: 201,
            message: "Pase creado exitosamente",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error al crear el pase",
            error: error.message,
        });
    }
};

const getPass = async (req, res) => {
    try {
        const pass = await passService.getPassById(req.params.id);
        if (!pass) {
            return res.status(404).json({
                status: 404,
                message: 'Pase no encontrado'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Pase obtenido con éxito',
            data: pass
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener el pase',
            error: error.message
        });
    }
};

const getAllPasses = async (req, res) => {
    try {
        const passes = await passService.getAllPasses();
        return res.status(200).json({
            status: 200,
            message: 'Pases obtenidos con éxito',
            data: passes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener los pases',
            error: error.message
        });
    }
};

const updatePass = async (req, res) => {
    try {
        const updatedPass = await passService.updatePass(req.params.id, req.body);
        return res.status(200).json({
            status: 200,
            message: 'Pase actualizado con éxito',
            data: updatedPass
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar el pase',
            error: error.message
        });
    }
};

const deletePass = async (req, res) => {
    try {
        await passService.deletePass(req.params.id);
        return res.status(200).json({
            status: 200,
            message: 'Pase eliminado con éxito'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar el pase',
            error: error.message
        });
    }
};

module.exports = {
    createPass,
    getPass,
    getAllPasses,
    updatePass,
    deletePass,
    uploadMiddleware
};
