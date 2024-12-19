const eventService = require('../services/eventService');

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

const updateEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await eventService.updateEventById(id, req.body);
        
        return res.status(200).json({
            status: 200,
            message: 'Evento actualizado exitosamente',
            data: updatedEvent
        });
    } catch (error) {
        console.error('Error en updateEventById:', error);
        if (error.message === 'Evento no encontrado') {
            return res.status(404).json({
                status: 404,
                message: error.message
            });
        }
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar el evento',
            error: error.message
        });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    updateEventById
};