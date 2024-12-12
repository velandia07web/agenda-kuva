const { Quotation, Pack, Add, Product, City, Client, PricePack,ProductPrice,EventAdd, EventPack, EventProduct, TypePrice, SocialMedia, Event} = require('../models');
const { Op } = require('sequelize');
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../email/email");

const { sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');

const createQuotation = async (data) => {
    const {
        reference,
        clientId,
        discount = 0,
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
            const { name, cityId, dateEvent, packs = [], products = [], adds = [] } = event;

            const city = await City.findByPk(cityId, { transaction });
            if (!city) throw new Error(`City con ID ${cityId} no encontrada`);
            const transportPrice = city.transportPrice || 0;
            transportTotal += transportPrice;

            const packsTotal = await Promise.all(
                packs.map(async (pack) => {
                    const packData = await Pack.findByPk(pack.id, {
                        include: [{ model: PricePack, as: 'PricePack' }],
                        transaction,
                    });
                    if (!packData || !packData.PricePack) throw new Error(`Pack con ID ${pack.id} no encontrado`);
                    return packData.PricePack[0].dataValues.price || 0;
                })
            );

            const productsTotal = await Promise.all(
                products.map(async (product) => {
                    const productData = await Product.findByPk(product.id, {
                        include: [
                            {
                                model: ProductPrice,
                                as: 'ProductPrices',
                                where: { hour: product.hour },
                            },
                        ],
                        transaction,
                    });

                    if (!productData || !productData.ProductPrices || productData.ProductPrices.length === 0) {
                        throw new Error(`Product con ID ${product.id} y hora ${product.hour} no encontrado`);
                    }
                    return productData.ProductPrices[0].price * product.quantity;
                })
            );

            const addsTotal = await Promise.all(
                adds.map(async (add) => {
                    const addData = await Add.findByPk(add.id, { transaction });
                    if (!addData) throw new Error(`Add con ID ${add.id} no encontrado`);
                    return addData.price * add.quantity;
                })
            );

            const eventTotal =
                transportPrice +
                packsTotal +
                productsTotal +
                addsTotal;

            quotationSubtotal += eventTotal;

            processedEvents.push({
                name,
                cityId,
                dateEvent,
                eventTotal,
                packs,
                products,
                adds,
            });
        }

        const totalNet = quotationSubtotal + transportTotal - discount;

        const quotation = await Quotation.create(
            {
                id: idQuotation,
                reference,
                clientId,
                typePricesId: typePricesId,
                telephone,
                SocialMediasId,
                email,
                userId,
                subtotal: quotationSubtotal,
                discount,
                IVA: quotationSubtotal * 0.19,
                totalNet,
                state: 'Pendiente',
            },
            { transaction }
        );

        for (const event of processedEvents) {
            const eventCreate = await Event.create(
                {
                    name: event.name,
                    cityId: event.cityId,
                    dateEvent: event.dateEvent,
                    total: event.eventTotal,
                    quotationId: quotation.id,
                },
                { transaction }
            );

            await Promise.all([
                ...event.packs.map((pack) =>
                    EventPack.create(
                        { id: uuidv4(), eventId: eventCreate.id, quotationId: quotation.id, packId: pack.id },
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
                            eventId: eventCreate.id
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
                            eventId: eventCreate.id
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
            include: [{ model: Client, as: 'Client' }],
        });
        if (!quotation) {
            throw new Error(`No se encontró la cotización con ID ${quotationId}`);
        }

        const client = quotation.Client;
        if (!client) {
            throw new Error(`No se encontró el cliente asociado con la cotización ${quotationId}`);
        }

        const approveUrl = `http://localhost:3310/api/quotation/${quotation.id}/respond?response=approved`;
        const rejectUrl = `http://localhost:3310/api/quotation/${quotation.id}/respond?response=rejected`;
        const tax = quotation.subtotal * 0.19;

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
            }
        );

        await sendMail("luisandresperez8@gmail.com", 'Tu Cotización', htmlTemplate);

        console.log(`Correo enviado a ${client.email} para la cotización ${quotationId}`);
    } catch (error) {
        console.error(`Error al enviar el correo: ${error.message}`);
        throw new Error(`Error al enviar el correo para la cotización ${quotationId}`);
    }
};

const getOneQuotation = async (id) => {
    return Quotation.findByPk(id);
}

const getAllQuotations = async () => {
    return Quotation.findAll();
}

const updateQuotation = async (id, updatedData) => {
    const quotation = await Quotation.findByPk(id);

    if (!quotation) return null;

    return quotation.update(updatedData);
}

const inactivateQuotation = async (id) => {
    const quotation = await Quotation.findByPk(id);

    if (!quotation) return null;

    return quotation.update({ state: 'inactive' });
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
    sendQuotationEmail
};