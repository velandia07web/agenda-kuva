const { name } = require('ejs');
const { Event, Quotation, User, City, EventAdd,EventProduct,EventPack, Add, Pack, Product, EventUser } = require('../models');

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
                    required: false,
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
                    attributes: ['id', 'quantity']
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
            personName: event.personName,
            personPhone: event.personPhone,
            eventImage: event.eventImage,
            eventDescription: event.eventDescription,
            eventAdds: event.EventAdd.map(ea => ({
                name: ea.add?.name,
                quantity: ea.quantity
            })),
            eventPacks: event.EventPack.map(ep => ({
                name: ep.Pack?.name,
                description: ep.Pack?.description,
                quantity: ep.quantity
            })),
            eventProducts: event.EventProduct.map(ep => ({
                name: ep.Product?.name,
                description: ep.Product?.description,
                quantity: ep.quantity
            })),
            eventUsers: event.EventUsers.map(eu => ({
                role: eu.role,
                id: eu.User?.id,
                name: eu.User?.name,
                email: eu.User?.email,
                cedula: eu.User?.cedula
            })),
            createdAt: event.createdAt,
            updatedAt: event.updatedAt
        };
    } catch (error) {
        throw new Error(`Error al obtener el evento con ID ${id}: ${error.message}`);
    }
};

const sendMail = require("../email/email");
const eventEmailTemplate = require('../email/templates/eventEmailTemplate.ejs');

const updateEventById = async (id, updateData) => {
    try {
        const event = await Event.findByPk(id, {
            include: [
                {
                    model: EventUser,
                    as: 'EventUsers',
                    include: {
                        model: User,
                        as: 'User',
                        attributes: ['email']
                    }
                }
            ]
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
        if (updateData.eventUsers) {
            let eventUsersArray;

            try {
                eventUsersArray = typeof updateData.eventUsers === 'string'
                    ? JSON.parse(updateData.eventUsers)
                    : updateData.eventUsers;
            } catch (error) {
                throw new Error('El formato de eventUsers no es válido. Debe ser un arreglo o un JSON válido.');
            }

            const existingUserIds = event.EventUsers.map(eu => eu.userId);
            const usersToAdd = eventUsersArray.filter(user => !existingUserIds.includes(user.id));
            if (usersToAdd.length > 0) {
                for (const user of usersToAdd) {
                    await EventUser.create({
                        eventId: event.id,
                        userId: user.id,
                        role: user.role
                    });
                }
            }
        }
        await event.reload({
            include: [
                {
                    model: EventUser,
                    as: 'EventUsers',
                    include: {
                        model: User,
                        as: 'User',
                        attributes: ['email']
                    }
                }
            ]
        });
        const requiredFields = [
            'name', 'status', 'dateStart', 'dateEnd', 'days',
            'total', 'location', 'eventImage', 'eventDescription'
        ];

        const isComplete = requiredFields.every(field => event[field] !== null && event[field] !== undefined);

        if (isComplete) {
            await event.update({ status: 'evento cerrado' });

            const eventDetails = await getEventById(id);
            const emailHtml = eventEmailTemplate(eventDetails);

            if (event.EventUsers && event.EventUsers.length > 0) {
                for (const eventUser of event.EventUsers) {
                    const userEmail = eventUser.User?.email;
                    if (userEmail) {
                        await sendMail(userEmail, 'Información del Evento Actualizada', emailHtml);
                    }
                }
            }
        }

        return await getEventById(id);
    } catch (error) {
        throw new Error(`Error al actualizar el evento: ${error.message}`);
    }
};



module.exports = {
    getAllEvents,
    getEventById,
    updateEventById
};