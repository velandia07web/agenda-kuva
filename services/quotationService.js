const { Quotation, Pack, Cabin, Product, City, Client, PricePack,CabinPrice,EventAdd, EventPack, EventProduct, TypePrice, SocialMedia, Event} = require('../models');
const { Op } = require('sequelize');
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../email/email");

const { sequelize } = require('../models'); // Importa el objeto Sequelize
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

        const processedEvents = await Promise.all(
            events.map(async (event) => {
                const { name, cityId, dateEvent, packs = [], products = [], adds = [] } = event;

                const city = await City.findByPk(cityId, { transaction });
                if (!city) throw new Error(`City con ID ${cityId} no encontrada`);
                const transportPrice = city.transportPrice || 0;
                transportTotal += transportPrice;

                const packsTotal = await Promise.all(
                    packs.map(async (pack) => {
                        const packData = await Pack.findByPk(pack.id, {
                            include: [{ model: PricePack, as: 'pricePack' }],
                            transaction,
                        });
                        if (!packData || !packData.pricePack) throw new Error(`Pack con ID ${pack.id} no encontrado`);
                        return packData.pricePack.price || 0;
                    })
                );

                const productsTotal = await Promise.all(
                    products.map(async (product) => {
                        const productData = await Product.findByPk(product.id, {
                            include: [{ model: ProductPrice, as: 'productPrice' }],
                            transaction,
                        });
                        if (!productData || !productData.productPrice) throw new Error(`Product con ID ${product.id} no encontrado`);
                        return productData.productPrice.price * product.quantity;
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
                    packsTotal.reduce((acc, price) => acc + price, 0) +
                    productsTotal.reduce((acc, price) => acc + price, 0) +
                    addsTotal.reduce((acc, price) => acc + price, 0);

                quotationSubtotal += eventTotal;

                const eventCreate = await Event.create(
                    {
                        name,
                        cityId,
                        dateEvent,
                        eventTotal,
                        idQuotation,
                    },
                    { transaction }
                );

                await Promise.all([
                    ...packs.map((pack) =>
                        EventPack.create(
                            { id: uuidv4(), quotationId: idQuotation, packId: pack.id },
                            { transaction }
                        )
                    ),
                    ...products.map((product) =>
                        EventProduct.create(
                            {
                                id: uuidv4(),
                                quotationId: idQuotation,
                                productId: product.id,
                                hours: product.hours,
                                days: product.days,
                                quantity: product.quantity,
                            },
                            { transaction }
                        )
                    ),
                    ...adds.map((add) =>
                        EventAdd.create(
                            {
                                id: uuidv4(),
                                quotationId: idQuotation,
                                addId: add.id,
                                quantity: add.quantity,
                            },
                            { transaction }
                        )
                    ),
                ]);

                return eventCreate;
            })
        );

        const totalNet = quotationSubtotal + transportTotal - discount;

        const quotation = await Quotation.create(
            {
                id: idQuotation,
                reference,
                clientId,
                typePricesId,
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

        await transaction.commit();

        return quotation;
    } catch (error) {
        await transaction.rollback();
        throw new Error(`Error al crear la cotización: ${error.message}`);
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
    getQuotationsByState
};