const { EventUser } = require('../models');

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

module.exports = {
    deleteEventUser
};
