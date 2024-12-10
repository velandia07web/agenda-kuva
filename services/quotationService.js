const { Quotation, Pack, Cabin, Product, City, Client, PricePack,CabinPrice,QuotationCabin, QuotationPack, QuotationProduct} = require('../models');
const { Op } = require('sequelize');
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../email/email");

const calculateSubtotal = async (packs, cabins, products) => {
    let subtotal = 0;

    if (packs && packs.length > 0) {
        for (pack of packs) {
            const {id} = pack;
            precio = await PricePack.findOne({ where: { idpack: id }});
            subtotal += precio.dataValues.price;
        }
    }

    if (cabins && cabins.length > 0) {
        for(const cabin of cabins) {
            const{id, hours} = cabin;
            precio = await CabinPrice.findOne({where: {idCabin: id}});
            subtotal += precio.dataValues.priceInit + ((hours - 1) * precio.dataValues.pricePerHour);
        }
    }

    if (products && products.length > 0) {
        for(const product of products) {
            const{id, quantity} = product;
            precio = await Product.findOne({where:{id: id}});
            subtotal += precio.dataValues.price * quantity;
        }
    }

    return subtotal;
};

const createQuotation = async (data) => {
    const {
        reference,
        clientId,
        eventDate,
        cityId,
        typeEvent,
        packs,
        adds,
        products,
        discount
    } = data;

    console.log(data);
    const client = await Client.findByPk(clientId);
    if (!client) {
        throw new Error('Client not found');
    }

    const city = await City.findByPk(cityId);
    if (!city) {
        throw new Error('City not found');
    }

    const subtotalWithoutTransport = await calculateSubtotal(packs, cabins, products);
    const subtotal = subtotalWithoutTransport + city.transportPrice;
    const taxRate = typeEvent === 'business' ? 0.19 : 0;
    const tax = subtotal * taxRate;
    const finalDiscount = discount || 0;
    const totalNet = subtotal - finalDiscount + tax;
    const state = "Pendiente";

    const quotation = await Quotation.create({
        state,
        correlativo: reference,
        reference,
        clientId,
        eventDate,
        cityId,
        eventType: typeEvent,
        subtotal,
        discount: finalDiscount,
        IVA: tax,
        totalNet
    });

    for (pack of packs) {
        const{id, idcity} = pack;
        await QuotationPack.create({id: require('uuid').v4(), quotationId: quotation.id,  packId: id, cityId: idcity});
    }
    for(const product of products) {
        const{id, quantity, idcity} = product;
        await QuotationProduct.create({id: require('uuid').v4(), quotationId: quotation.id, productId: id, quantity, cityId: idcity});
    }

    for(const add of adds) {
        const{id, quantity, idcity} = product;
        await QuotationProduct.create({id: require('uuid').v4(), quotationId: quotation.id, productId: id, quantity, cityId: idcity});
    }

    const approveUrl = `http://localhost:3310/api/quotation/${quotation.id}/respond?response=approved`;
    const rejectUrl = `http://localhost:3310/api/quotation/${quotation.id}/respond?response=rejected`;

    const htmlTemplate = await ejs.renderFile(
        path.join(__dirname, "../email/templates/quotation.ejs"),
        {
            clientName: client.name,
            reference: quotation.reference,
            subtotal: quotation.subtotal,
            tax: tax,
            discount: quotation.discount,
            totalNet: quotation.totalNet,
            approveUrl,
            rejectUrl
        }
    );

    await sendMail(client.email, 'Tu Cotización', htmlTemplate);

    return quotation;
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