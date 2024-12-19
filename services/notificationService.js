const { Event, Quotation, Notification, User } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    async generateNotifications() {
        try {
            const today = new Date();

            const fiveDaysLater = new Date(today);
            fiveDaysLater.setDate(today.getDate() + 5);

            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const events = await Event.findAll({
                where: {
                    dateStart: {
                        [Op.or]: [
                            { [Op.eq]: fiveDaysLater },
                            { [Op.eq]: tomorrow }
                        ]
                    }
                },
                include: [
                    {
                        model: Quotation,
                        as: 'Quotation',
                        attributes: ['userId']
                    }
                ]
            });

            const notifications = [];

            for (const event of events) {
                const userId = event.Quotation.userId;
                const daysLeft = Math.ceil((new Date(event.dateStart) - today) / (1000 * 60 * 60 * 24));

                const description = daysLeft === 5
                    ? `El evento ${event.id} será en 5 días`
                    : `El evento ${event.id} será mañana`;

                const notification = await Notification.create({
                    userId,
                    description
                });

                notifications.push(notification);
            }

            return notifications;
        } catch (error) {
            console.error('Error en generateNotifications:', error.message);
            throw new Error('Error al generar notificaciones: ' + error.message);
        }
    }
};
