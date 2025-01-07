const eventUserService = require('../services/eventUserService');

const deleteEventUser = async (req, res) => {
    try {
        const { eventId, userId } = req.params;

        const result = await eventUserService.deleteEventUser(eventId, userId);

        if (result) {
            return res.status(200).json({
                status: 200,
                message: 'EventUser eliminado exitosamente'
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: 'EventUser no encontrado'
            });
        }
    } catch (error) {
        console.error('Error en deleteEventUser:', error);
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar el EventUser',
            error: error.message
        });
    }
};

const getUsersNotInEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        const users = await eventUserService.getUsersNotInEvent(eventId);

        return res.status(200).json({
            status: 200,
            data: users,
            message: 'Usuarios recuperados exitosamente'
        });
    } catch (error) {
        console.error('Error en getUsersNotInEvent:', error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};

module.exports = {
    deleteEventUser,
    getUsersNotInEvent
};
