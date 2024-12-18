const { Sale, Quotation,Client, Event, Pass, PaymentsDate, PassPayment } = require('../models');
const nodemailer = require('nodemailer');
const path = require('path');
const { google } = require('googleapis');

const CLIENT_ID = process.env.EMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET
const REDIRECT_URI = process.env.EMAIL_REDIRECT_URI
const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN
const EMAIL_USER = process.env.EMAIL_USER


const getVentas = async () => {
    try {
        const sales = await Sale.findAll({
            include: [
                {
                    model: Quotation,
                    as: 'Quotation',
                    include: [
                        { model: Client, as: 'Client' },
                        { model: Event, as: 'Events' }
                    ]
                },
                { model: PaymentsDate, as: 'PaymentsDate' }
            ]
        });

        if (!sales || sales.length === 0) {
            throw new Error('No se encontraron ventas registradas.');
        }

        const salesData = await Promise.all(
            sales.map(async (sale) => {
                const quotation = sale.Quotation;
                if (!quotation) {
                    throw new Error(`No se encontró una cotización asociada a la venta con ID ${sale.id}.`);
                }

                const totalNet = quotation.totalNet;
                const IVA = quotation.IVA;
                const subtotal = quotation.subtotal;

                const totalTransport = quotation.Events.reduce((sum, event) => sum + event.transportPrice, 0);

                const client = quotation.Client;
                if (!client) {
                    throw new Error(`No se encontró un cliente asociado a la cotización con ID ${quotation.id}.`);
                }
                const methodOfPayment = client.typePayment;

                const paymentDateDetails = await PaymentsDate.findByPk(client.idPaymentsDate);
                if (!paymentDateDetails) {
                    throw new Error(`No se encontró la configuración de fecha de pago para el cliente con ID ${client.id}.`);
                }
                const fechaDePago = new Date(quotation.createdAt);
                fechaDePago.setDate(fechaDePago.getDate() + paymentDateDetails.numberDays);

                const pass = await Pass.findOne({ where: { clientId: client.id } });
                if (!pass) {
                    throw new Error(`No se encontró un pase asociado al cliente con ID ${client.id}.`);
                }
                const totalAbono = await PassPayment.sum('payment', { where: { idPass: pass.id } });

                return {
                    saleId: sale.id,
                    totalNet,
                    IVA,
                    subtotal,
                    totalTransport,
                    methodOfPayment,
                    fechaDePago,
                    totalAbono
                };
            })
        );

        return salesData;
    } catch (error) {
        throw new Error(`Error al obtener las ventas: ${error.message}`);
    }
};

const createSale = async (data) => {
    try {
        return await Sale.create(data);
    } catch (error) {
        throw new Error(`Error al crear la venta: ${error.message}`);
    }
};

const getSale = async (id) => {
    try {
        const sale = await Sale.findByPk(id, {
            include: [
                {
                    model: Quotation,
                    as: 'Quotation',
                    include: [
                        { model: Client, as: 'Client' },
                        { model: Event, as: 'Events' },
                    ],
                },
                { model: PaymentsDate, as: 'PaymentsDate' },
            ],
        });

        if (!sale) {
            throw new Error(`Venta con ID ${id} no encontrada.`);
        }

        const quotation = sale.Quotation;
        if (!quotation) {
            throw new Error(`No se encontró una cotización asociada a la venta con ID ${id}.`);
        }

        const totalNet = quotation.totalNet;
        const IVA = quotation.IVA;
        const subtotal = quotation.subtotal;

        const totalTransport = quotation.Events.reduce((sum, event) => sum + event.transportPrice, 0);

        const client = quotation.Client;
        if (!client) {
            throw new Error(`No se encontró un cliente asociado a la cotización con ID ${quotation.id}.`);
        }
        const methodOfPayment = client.typePayment;

        const paymentDateDetails = await PaymentsDate.findByPk(client.idPaymentsDate);
        if (!paymentDateDetails) {
            throw new Error(`No se encontró la configuración de fecha de pago para el cliente con ID ${client.id}.`);
        }

        const fechaDePago = new Date(quotation.createdAt);
        fechaDePago.setDate(fechaDePago.getDate() + paymentDateDetails.numberDays);

        const pass = await Pass.findOne({ where: { clientId: client.id } });
        if (!pass) {
            throw new Error(`No se encontró un pase asociado al cliente con ID ${client.id}.`);
        }

        const totalAbono = await PassPayment.sum('payment', { where: { idPass: pass.id } });

        return {
            saleId: sale.id,
            totalNet,
            IVA,
            subtotal,
            totalTransport,
            methodOfPayment,
            fechaDePago,
            totalAbono,
        };
    } catch (error) {
        throw new Error(`Error al obtener la venta con ID ${id}: ${error.message}`);
    }
};


const updateSale = async (id, data) => {
    try {
        const sale = await Sale.findByPk(id);
        if (!sale) {
            throw new Error('Venta no encontrada');
        }
        return await sale.update(data);
    } catch (error) {
        throw new Error(`Error al actualizar la venta con ID ${id}: ${error.message}`);
    }
};

const deleteSale = async (id) => {
    try {
        const sale = await Sale.findByPk(id);
        if (!sale) {
            throw new Error('Venta no encontrada');
        }
        await sale.destroy();
    } catch (error) {
        throw new Error(`Error al eliminar la venta con ID ${id}: ${error.message}`);
    }
};

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const sendPdfByEmail = async (to, subject, htmlContent, pdfPath) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL_USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: `Kuva ${EMAIL_USER}`,
            to,
            subject,
            html: htmlContent,
            attachments: [
                {
                    filename: 'document.pdf',
                    path: pdfPath,
                },
            ],
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error enviando correo:', error);
        throw new Error('Error enviando correo');
    }
};


module.exports = {
    getVentas,
    createSale,
    getSale,
    updateSale,
    deleteSale,
    sendPdfByEmail
};