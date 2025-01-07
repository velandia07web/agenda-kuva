const eventService = require('../services/eventService');
const { Event } = require('../models');

const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        return res.status(200).json({
            status: 200,
            message: 'Eventos obtenidos exitosamente',
            data: events
        });
    } catch (error) {
        console.error('Error en getAllEvents:', error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener los eventos',
            error: error.message
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventService.getEventById(id);
        
        return res.status(200).json({
            status: 200,
            message: 'Evento obtenido exitosamente',
            data: event
        });
    } catch (error) {
        console.error('Error en getEventById:', error);
        if (error.message === 'Evento no encontrado') {
            return res.status(404).json({
                status: 404,
                message: error.message
            });
        }
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener el evento',
            error: error.message
        });
    }
};

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads/events');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

const updateEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            updateData.eventImage = `/uploads/events/${req.file.filename}`;
        }

        const updatedEvent = await eventService.updateEventById(id, updateData);

        return res.status(200).json({
            status: 200,
            message: 'Evento actualizado exitosamente',
            data: updatedEvent
        });
    } catch (error) {
        console.error('Error en updateEventById:', error);
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar el evento',
            error: error.message
        });
    }
};

const downloadEventImage = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({
                status: 404,
                message: 'Evento no encontrado',
            });
        }

        const filePath = path.join(__dirname, '../', event.eventImage);

        if (fs.existsSync(filePath)) {
            return res.download(filePath);
        } else {
            return res.status(404).json({
                status: 404,
                message: 'Archivo de imagen no encontrado',
            });
        }
    } catch (error) {
        console.error('Error en downloadEventImage:', error);
        return res.status(500).json({
            status: 500,
            message: 'Error al descargar la imagen',
            error: error.message,
        });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    updateEventById,
    downloadEventImage,
    upload
};