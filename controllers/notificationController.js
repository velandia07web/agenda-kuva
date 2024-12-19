const notificationService = require('../services/notificationService');

module.exports = {
    async generateNotifications(req, res) {
        try {
            const notifications = await notificationService.generateNotifications();
            res.status(200).json({ message: 'Notificaciones generadas exitosamente', notifications });
        } catch (error) {
            console.error('Error en generateNotifications:', error.message);
            res.status(500).json({ error: 'Error al generar las notificaciones', details: error.message });
        }
    }
};

