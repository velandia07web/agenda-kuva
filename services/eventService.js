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
                    model: EventUser,
                    as: 'EventUsers',
                    include: [
                        {
                            model: User,
                            as: 'User',
                            attributes: ['id', 'name', 'email', 'cedula']
                        }
                    ],
                    attributes: ['role']
                },
                {
                    model: EventAdd,
                    as: 'EventAdd',
                    include: [{
                        model: Add,
                        as: 'add',
                        attributes: ['name']
                    }],
                    attributes: ['id', 'quantity']
                },
                {
                    model: EventPack,
                    as: 'EventPack',
                    include: [{
                        model: Pack,
                        as: 'Pack',
                        attributes: ['name', 'description']
                    }],
                    attributes: ['id']
                },
                {
                    model: EventProduct,
                    as: 'EventProduct',
                    include: [{
                        model: Product,
                        as: 'Product',
                        attributes: ['name', 'description']
                    }],
                    attributes: ['id', 'quantity']
                }
            ]
        });

        if (!event) {
            throw new Error('Evento no encontrado');
        }

        const roles = event.EventUsers.reduce((acc, eu) => {
            if (eu.role === 'coordinator') acc.coordinator = eu.User;
            if (eu.role === 'designer') acc.designer = eu.User;
            if (eu.role === 'logistic') acc.logistic = eu.User;
            return acc;
        }, {});

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
            coordinator: roles.coordinator || null,
            designer: roles.designer || null,
            logistic: roles.logistic || null,
            personName: event.personName,
            personPhone: event.personPhone,
            eventImage: event.eventImage,
            eventDescription: event.eventDescription,
            eventAdds: event.EventAdd.map(ea => ({
                name: ea.Add?.name,
                quantity: ea.quantity
            })),
            eventPacks: event.EventPack.map(ep => ({
                name: ep.Pack?.name,
                description: ep.Pack?.description
            })),
            eventProducts: event.EventProduct.map(ep => ({
                name: ep.Product?.name,
                description: ep.Product?.description,
                quantity: ep.quantity
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
        const event = await Event.findByPk(id, {
            include: [{
                model: EventUser,
                as: 'EventUsers'
            }]
        });

        if (!event) {
            throw new Error('Evento no encontrado');
        }

        const allowedFields = [
            'name', 'status', 'dateStart', 'dateEnd', 'days',
            'total', 'transportPrice', 'location', 'cityId',
            'personName', 'personPhone', 'eventImage',
            'eventDescription'
        ];

        const filteredData = Object.keys(updateData)
            .filter(key => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = updateData[key];
                return obj;
            }, {});

        const currentDate = new Date();
        const startDate = new Date(event.dateStart);

        if (currentDate < startDate) {
            filteredData.status = 'evento abierto';
        }

        if (updateData.dateStart) {
            const newStartDate = new Date(updateData.dateStart);
            if (currentDate < newStartDate) {
                filteredData.status = 'evento abierto';
            }
        }

        await event.update(filteredData);

        if (updateData.roles) {
            for (const role in updateData.roles) {
                const userId = updateData.roles[role];
                const eventUser = event.EventUsers.find(eu => eu.role === role);

                if (eventUser) {
                    await eventUser.update({ userId });
                } else {
                    await EventUser.create({
                        eventId: event.id,
                        userId,
                        role
                    });
                }
            }
        }

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