const { Event, Quotation, User, City, EventAdd,EventProduct,EventPack, Add, Pack, Product } = require('../models');

const getAllEvents = async () => {
    try {
        const events = await Event.findAll();

        if (!events || events.length === 0) {
            throw new Error('No se encontraron eventos registrados');
        }

        return events;
    } catch (error) {
        throw new Error(`Error al obtener los eventos: ${error.message}`);
    }
};

const getEventById = async (id) => {
    try {
        const event = await Event.findByPk(id, {
            include: [
                {
                    model: Quotation,
                    as: 'Quotation',
                    attributes: ['reference', 'clientId', 'userId']
                },
                {
                    model: User,
                    as: 'Coordinator',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'Designer',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: User,
                    as: 'Logistic',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: EventAdd,
                    as: 'EventAdd',
                    include: [{
                        model: Add,
                        as: 'add',
                        attributes: ['name']
                    }],
                    attributes: ['id']
                },
                {
                    model: EventPack,
                    as: 'EventPack',
                    include: [{
                        model: Pack,
                        as: 'Pack',
                        attributes: ['name']
                    }],
                    attributes: ['id']
                },
                {
                    model: EventProduct,
                    as: 'EventProduct',
                    include: [{
                        model: Product,
                        as: 'Product',
                        attributes: ['name']
                    }],
                    attributes: ['id']
                }
            ]
        });

        if (!event) {
            throw new Error('Evento no encontrado');
        }

        return {
            id: event.id,
            name: event.name,
            status: event.status,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            days: event.days,
            total: event.total,
            transportPrice: event.transportPrice,
            location: event.location,
            quotationReference: event.Quotation?.reference,
            coordinator: event.Coordinator ? {
                id: event.Coordinator.id,
                name: event.Coordinator.name,
                email: event.Coordinator.email
            } : null,
            designer: event.Designer ? {
                id: event.Designer.id,
                name: event.Designer.name,
                email: event.Designer.email
            } : null,
            logistic: event.Logistic ? {
                id: event.Logistic.id,
                name: event.Logistic.name,
                email: event.Logistic.email
            } : null,
            personName: event.personName,
            personPhone: event.personPhone,
            eventImage: event.eventImage,
            eventDescription: event.eventDescription,
            eventAdds: event.EventAdd.map(ea => ({
                name: ea.Add?.name
            })),
            eventPacks: event.EventPack.map(ep => ({
                name: ep.Pack?.name
            })),
            eventProducts: event.EventProduct.map(ep => ({
                name: ep.Product?.name
            })),
            createdAt: event.createdAt,
            updatedAt: event.updatedAt
        };
    } catch (error) {
        throw new Error(`Error al obtener el evento con ID ${id}: ${error.message}`);
    }
};


const updateEventById = async (id, updateData) => {
    try {
        const event = await Event.findByPk(id);
        
        if (!event) {
            throw new Error('Evento no encontrado');
        }

        const allowedFields = [
            'name', 'status', 'dateStart', 'dateEnd', 'days',
            'total', 'transportPrice', 'location', 'cityId',
            'coordinatorId', 'designerId', 'logisticId',
            'personName', 'personPhone', 'eventImage',
            'eventDescription'
        ];

        const filteredData = Object.keys(updateData)
            .filter(key => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = updateData[key];
                return obj;
            }, {});

        await event.update(filteredData);

        return await getEventById(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    updateEventById
};