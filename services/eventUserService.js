const { User, EventUser, sequelize } = require('../models');
const { Op } = require('sequelize');

const deleteEventUser = async (eventId, userId) => {
    try {
        const deletedCount = await EventUser.destroy({
            where: {
                eventId,
                userId
            }
        });
        return deletedCount > 0;
    } catch (error) {
        throw new Error(`Error al eliminar el EventUser: ${error.message}`);
    }
};

const getUsersNotInEvent = async (eventId) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name'],
            where: {
                id: {
                    [Op.notIn]: sequelize.literal(
                        `(SELECT userId FROM EventUsers WHERE eventId = '${eventId}')`
                    )
                },
                active: true
            },
            order: [['name', 'ASC']]
        });

        return users;
    } catch (error) {
        throw new Error(`Error al obtener usuarios no asignados al evento: ${error.message}`);
    }
};

module.exports = {
    deleteEventUser,
    getUsersNotInEvent
};
