const { Quotation,TypeClient, Pack, Add, Product, City, Client, PricePack,ProductPrice,EventAdd, EventPack, EventProduct, TypePrice, SocialMedia, Event, Company} = require('../models');
const { Op } = require('sequelize');
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../email/email");

const { sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');

const createQuotation = async (data) => {
    const {
        clientId,
        discount = 0,
        IVA,
        totalNeto,
        subTotal,
        typePricesId,
        telephone,
        SocialMediasId,
        email,
        userId,
        events
    } = data;

    const idQuotation = uuidv4();

    const transaction = await sequelize.transaction();
    try {
        const client = await Client.findByPk(clientId, { transaction });
        if (!client) throw new Error('No se encontró el Cliente');

        const typePrice = await TypePrice.findByPk(typePricesId, { transaction });
        if (!typePrice) throw new Error('El Type Price no fue encontrado');

        const socialMedia = await SocialMedia.findByPk(SocialMediasId, { transaction });
        if (!socialMedia) throw new Error('El Social Media no fue encontrado');

        let quotationSubtotal = 0;
        let transportTotal = 0;

        const processedEvents = [];
        for (const event of events) {
            const {name,cityId,dateStart,dateEnd,total,transportPrice,days,packs = [], products = [], adds = [] } = event;

            transportTotal += transportPrice;

            const packsTotal = await Promise.all(
                packs.map(async (pack) => {
                    const packData = await Pack.findByPk(pack.id, { transaction });
                    if (!packData) throw new Error(`Pack con ID ${pack.id} no encontrado`);
                    if (packData.state !== 'ACTIVO') {
                        throw new Error(`Pack con ID ${pack.id} no está ACTIVO`);
                    }
                    const pricePack = await PricePack.findOne({ where: { idPack: pack.id }, transaction });
                    if (!pricePack) throw new Error(`Precio no encontrado para el Pack con ID ${pack.id}`);
                    return parseFloat(pricePack.price || 0);
                })
            );
            const packsTotalSum = packsTotal.reduce((sum, value) => sum + value, 0);

            const productsTotal = await Promise.all(
                products.map(async (product) => {
                    const productData = await Product.findByPk(product.id, { transaction });
                    if (!productData) throw new Error(`Producto con ID ${product.id} no encontrado`);
                    if (productData.state !== 'ACTIVO') {
                        throw new Error(`Producto con ID ${product.id} no está ACTIVO`);
                    }
                    if (productData.count <= 0) {
                        throw new Error(`Producto con ID ${product.id} no tiene suficiente inventario`);
                    }
                    if (product.quantity > productData.count) {
                        throw new Error(`Cantidad solicitada (${product.quantity}) excede el inventario disponible (${productData.count}) para el producto ${product.id}`);
                    }
            
                    await productData.update({
                        count: productData.count - product.quantity
                    }, { transaction });
            
                    const productPrice = await ProductPrice.findOne({
                        where: { product_id: product.id, hour: product.hour },
                        transaction,
                    });
                    if (!productPrice) throw new Error(`Precio no encontrado para el Producto con ID ${product.id}`);
                    return parseFloat(productPrice.price || 0) * parseInt(product.quantity || 0, 10);
                })
            );
            const productsTotalSum = productsTotal.reduce((sum, value) => sum + value, 0);

            const addsTotal = await Promise.all(
                adds.map(async (add) => {
                    const addData = await Add.findByPk(add.id, { transaction });
                    if (!addData) throw new Error(`Add con ID ${add.id} no encontrado`);
                    const price = parseFloat(addData.price || 0);
                    const quantity = parseInt(add.quantity || 0, 10);
                    if (isNaN(price) || isNaN(quantity)) {
                        throw new Error(`Datos inválidos para Add con ID ${add.id}`);
                    }
                    return price * quantity;
                })
            );

            const addsTotalSum = addsTotal.reduce((sum, value) => sum + value, 0);

            const eventTotal = parseFloat(transportPrice || 0) +
                parseFloat(packsTotalSum || 0) +
                parseFloat(productsTotalSum || 0) +
                parseFloat(addsTotalSum || 0);

            quotationSubtotal += eventTotal;

            processedEvents.push({
                name,
                cityId,
                dateStart,
                dateEnd,
                total,
                days,
                packs,
                products,
                adds,
                transportPrice
            });
        }

        const clientType = await Client.findByPk(clientId, {
            include: [{
                model: TypeClient,
                as: 'TypeClient',
            }],
            transaction,
        });
        let totalNet = 0
        if (clientType?.TypeClient?.dataValues?.name === 'Empresa') {
            totalNet = (parseFloat(quotationSubtotal) || 0)
                - (parseFloat(discount) || 0)
                - (parseFloat(quotationSubtotal * 0.19) || 0);

            const company = await Company.findByPk(client.idCompany, { transaction });
            if (!company) throw new Error('No se encontró la empresa asociada al cliente');

            if(company.typePayment === 'CUOTAS'){
                if (company.cupo < totalNet) {
                    throw new Error('Cupo insuficiente en la empresa para realizar esta cotización');
                }
            }
        } else {
            totalNet = (parseFloat(quotationSubtotal) || 0)
                - (parseFloat(discount) || 0);

            if(client.typePayment === 'CUOTAS'){
                if (client.cupoDisponible < totalNet) {
                    throw new Error('Cupo disponible insuficiente para realizar esta cotización');
                }   
            } 
        }

        const quotation = await Quotation.create(
            {
                id: idQuotation,
                reference: uuidv4(),
                clientId,
                discount,
                IVA,
                totalNet: totalNeto,
                subtotal: subTotal,
                typePricesId: typePricesId,
                telephone,
                SocialMediasId,
                email,
                userId,
                state: 'Pendiente',
                etapa: 'ACTIVO'
            },
            { transaction }
        );

        for (const event of processedEvents) {
            const eventCreate = await Event.create(
                {
                    name: event.name,
                    cityId: event.cityId,
                    dateStart: event.dateStart,
                    dateEnd: event.dateEnd,
                    total: event.total,
                    quotationId: quotation.id,
                    days: event.days,
                    transportPrice: event.transportPrice,
                    status: "evento sin completar"
                },
                { transaction }
            );

            await Promise.all([
                ...event.packs.map((pack) =>
                    EventPack.create(
                        { id: uuidv4(), eventId: eventCreate.id, quotationId: quotation.id, packId: pack.id, quantityDeadHours: pack.quantityDeadHours },
                        { transaction }
                    )
                ),
                ...event.products.map((product) =>
                    EventProduct.create(
                        {
                            id: uuidv4(),
                            quotationId: quotation.id,
                            productId: product.id,
                            hours: product.hour,
                            days: product.days,
                            quantity: product.quantity,
                            eventId: eventCreate.id,
                            quantityDeadHours: product.quantityDeadHours
                        },
                        { transaction }
                    )
                ),
                ...event.adds.map((add) =>
                    EventAdd.create(
                        {
                            id: uuidv4(),
                            quotationId: quotation.id,
                            addId: add.id,
                            quantity: add.quantity,
                            eventId: eventCreate.id,
                            quantityDeadHours: add.quantityDeadHours
                        },
                        { transaction }
                    )
                ),
            ]);
        }

        await transaction.commit();
        return quotation;
    } catch (error) {
        await transaction.rollback();
        throw new Error(`Error al crear la cotización: ${error.message}`);
    }
};

const sendQuotationEmail = async (quotationId) => {
    try {
        const quotation = await Quotation.findByPk(quotationId, {
            include: [
                {
                    model: Client,
                    as: 'Client',
                },
                {
                    model: Event,
                    as: 'Events',
                    include: [
                        {
                            model: EventAdd,
                            as: 'EventAdd',
                            include: [
                                {
                                    model: Add,
                                    as: 'add',
                                },
                            ],
                        },
                        {
                            model: EventProduct,
                            as: 'EventProduct',
                            include: [
                                {
                                    model: Product,
                                    as: 'Product',
                                },
                            ],
                        },
                        {
                            model: EventPack,
                            as: 'EventPack',
                            include: [
                                {
                                    model: Pack,
                                    as: 'Pack',
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!quotation) {
            throw new Error(`No se encontró la cotización con ID ${quotationId}`);
        }

        const client = quotation.Client;
        if (!client) {
            throw new Error(`No se encontró el cliente asociado con la cotización ${quotationId}`);
        }

        const approveUrl = `http://localhost:3310/api/quotation/${quotation.id}/respond?response=Aprobado`;
        const rejectUrl = `http://localhost:3310/api/quotation/${quotation.id}/respond?response=Rechazada`;
        const tax = quotation.subtotal * 0.19;

        const eventDetails = quotation.Events.map(event => ({
            products: event.EventProduct?.map(ep => ep.Product?.name || 'Producto sin nombre').join(', ') || 'Sin productos',
            packs: event.EventPack?.map(ep => ep.Pack?.name || 'Pack sin nombre').join(', ') || 'Sin packs',
            adds: event.EventAdd?.map(ea => ea.add?.name || 'Añadido sin nombre').join(', ') || 'Sin añadidos',
        }));

        const htmlTemplate = await ejs.renderFile(
            path.join(__dirname, "../email/templates/quotation.ejs"),
            {
                clientName: client.name,
                reference: quotation.reference,
                subtotal: quotation.subtotal,
                tax,
                discount: quotation.discount,
                totalNet: quotation.totalNet,
                approveUrl,
                rejectUrl,
                eventDetails,
            }
        );

        await sendMail(client.email, 'Tu Cotización', htmlTemplate);

        console.log(`Correo enviado a ${client.email} para la cotización ${quotationId}`);
    } catch (error) {
        console.error(`Error al enviar el correo: ${error.message}`);
        throw new Error(`Error al enviar el correo para la cotización ${quotationId}`);
    }
};

const sendQuotationEmailOne = async (quotationId, email) => {
    try {
        const quotation = await Quotation.findByPk(quotationId, {
            include: [
                {
                    model: Client,
                    as: 'Client',
                },
                {
                    model: Event,
                    as: 'Events',
                    include: [
                        {
                            model: EventAdd,
                            as: 'EventAdd',
                            include: [
                                {
                                    model: Add,
                                    as: 'add',
                                    attributes: ['name'],
                                },
                            ],
                            attributes: ['id', 'quantity'],
                        },
                        {
                            model: EventProduct,
                            as: 'EventProduct',
                            include: [
                                {
                                    model: Product,
                                    as: 'Product',
                                    attributes: ['name', 'description'],
                                },
                            ],
                            attributes: ['id', 'quantity'],
                        },
                        {
                            model: EventPack,
                            as: 'EventPack',
                            include: [
                                {
                                    model: Pack,
                                    as: 'Pack',
                                    attributes: ['name', 'description'],
                                },
                            ],
                            attributes: ['id'],
                        },
                    ],
                },
            ],
        });

        if (!quotation) {
            throw new Error(`No se encontró la cotización con ID ${quotationId}`);
        }

        const client = quotation.Client;
        if (!client) {
            throw new Error(`No se encontró el cliente asociado con la cotización ${quotationId}`);
        }

        const approveUrl = `http://localhost:3310/api/quotation/${quotation.id}/respond?response=Aprobado`;
        const rejectUrl = `http://localhost:3310/api/quotation/${quotation.id}/respond?response=Rechazada`;
        const tax = quotation.subtotal * 0.19;

        const eventDetails = quotation.Events?.map(event => ({
            products: event.EventProduct?.map(ep => ep.Product?.name || 'Producto sin nombre').join(', ') || 'Sin productos',
            packs: event.EventPack?.map(ep => ep.Pack?.name || 'Pack sin nombre').join(', ') || 'Sin packs',
            adds: event.EventAdd?.map(ea => ea.add?.name || 'Añadido sin nombre').join(', ') || 'Sin añadidos',
        })) || [];

        const htmlTemplate = await ejs.renderFile(
            path.join(__dirname, "../email/templates/quotation.ejs"),
            {
                clientName: client.name,
                reference: quotation.reference,
                subtotal: quotation.subtotal,
                tax,
                discount: quotation.discount,
                totalNet: quotation.totalNet,
                approveUrl,
                rejectUrl,
                eventDetails,
            }
        );

        await sendMail(email, 'Tu Cotización', htmlTemplate);

        console.log(`Correo enviado a ${email} para la cotización ${quotationId}`);
    } catch (error) {
        console.error(`Error al enviar el correo: ${error.message}`);
        throw new Error(`Error al enviar el correo para la cotización ${quotationId}`);
    }
};

const getOneQuotation = async (id) => {
    return Quotation.findByPk(id, {
        include: [
            {
                model: Event,
                as: 'Events',
                include: [
                    {
                        model: EventAdd,
                        as: 'EventAdd',
                        include: [
                            {
                                model: Add,
                                as: 'add',
                            },
                        ],
                    },
                    {
                        model: EventProduct,
                        as: 'EventProduct',
                        include: [
                            {
                                model: Product,
                                as: 'Product',
                            },
                        ],
                    },
                    {
                        model: EventPack,
                        as: 'EventPack',
                        include: [
                            {
                                model: Pack,
                                as: 'Pack',
                            },
                        ],
                    },
                ],
            },
        ],
    });
};


const getAllQuotations = async () => {
    try {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        await Quotation.update(
            { state: 'Rechazada' },
            {
                where: {
                    state: 'Pendiente',
                    createdAt: { [Op.lt]: thirtyDaysAgo }
                }
            }
        );
        return Quotation.findAll();
    } catch (error) {
        throw new Error(`Error al obtener o actualizar cotizaciones: ${error.message}`);
    }
};

const updateQuotation = async (id, updatedData) => {
    const quotation = await Quotation.findByPk(id);

    if (!quotation) return null;

    return quotation.update(updatedData);
}

const inactivateQuotation = async (id) => {
    try {
        const quotation = await Quotation.findOne({ where: { id } });

        if (!quotation) {
            throw new Error(`Cotización con id ${id} no encontrada`);
        }

        const newState = quotation.etapa === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

        const updatedCount = await Quotation.update(
            { etapa: newState },
            { where: { id } }
        );

        if (updatedCount[0] === 0) {
            throw new Error(`No se pudo actualizar el estado de la cotización con id ${id}`);
        }

        return { id, newState };
    } catch (error) {
        throw new Error(`Error al alternar el estado de la cotización: ${error.message}`);
    }
}

const getQuotationsByState = async (state) => {
    return Quotation.findAll({ where: { state } });
}

module.exports = {
    createQuotation,
    getOneQuotation,
    getAllQuotations,
    updateQuotation,
    inactivateQuotation,
    getQuotationsByState,
    sendQuotationEmail,
    sendQuotationEmailOne
};