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
    },

    async generateNotificationsPayments(req, res) {
        try {
            const notifications = await notificationService.notifyQuotationPayments();
            res.status(200).json({ message: 'Notificaciones generadas exitosamente', notifications });
        } catch (error) {
            console.error('Error en generateNotifications:', error.message);
            res.status(500).json({ error: 'Error al generar las notificaciones', details: error.message });
        }
    },

    async getAllNotifications(req, res) {
        try {
            const notifications = await notificationService.getAllNotifications();
            res.status(200).json({ message: 'Notificaciones obtenidas exitosamente', notifications });
        } catch (error) {
            console.error('Error en getAllNotifications:', error.message);
            res.status(500).json({ error: 'Error al obtener las notificaciones', details: error.message });
        }
    },

    async getNotificationsByUserId(req, res) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ error: 'El userId es requerido' });
            }

            const notifications = await notificationService.getNotificationsByUserId(userId);
            res.status(200).json({ message: 'Notificaciones obtenidas exitosamente', notifications });
        } catch (error) {
            console.error('Error en getNotificationsByUserId:', error.message);
            res.status(500).json({ error: 'Error al obtener las notificaciones por usuario', details: error.message });
        }
    }
};

