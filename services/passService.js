const { Pass , PassPayment, Quotation, Sale, sequelize } = require('../models');
const sendMail = require('../email/email');
const path = require('path');
const ejs = require('ejs');

const createPass = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const quotation = await Quotation.findByPk(data.quotationId);
        if (!quotation) {
            throw new Error('Cotización no encontrada');
        }

        let pass = await Pass.findOne({
            where: { quotationId: data.quotationId },
        });

        let totalAbono = 0;
        if (pass) {
            totalAbono = await PassPayment.sum('payment', { 
                where: { idPass: pass.id } 
            }) || 0;
        }

        if (!pass) {
            pass = await Pass.create(
                {
                    quotationId: data.quotationId,
                },
                { transaction }
            );
        }

        const nuevoTotal = totalAbono + data.payment;
        
        if (nuevoTotal > quotation.totalNet) {
            const excedente = nuevoTotal - quotation.totalNet;
            throw new Error(`El pago excede el total. Reduce el pago en ${excedente} para igualar el total.`);
        }

        const paymentData = {
            idPass: pass.id,
            payment: data.payment,
            file: data.file,
        };
        
        await PassPayment.create(paymentData, { transaction });

        let sale = await Sale.findOne({
            where: { idQuotation: data.quotationId },
        });

        if (sale) {
            if (totalAbono === 0 && data.payment > 0) {
                await sale.update({ 
                    state: 'venta abierta' 
                }, { transaction });
            } else if (nuevoTotal === quotation.totalNet) {
                await sale.update({ 
                    state: 'venta cerrada' 
                }, { transaction });
            }
        }

        const emailTemplatePath = path.join(__dirname, '../email/templates/paymentConfirmation.ejs');
        const htmlContent = await ejs.renderFile(emailTemplatePath, {
            name: quotation.customerName || 'Cliente',
            payment: data.payment,
            totalNet: quotation.totalNet,
            totalAbono: nuevoTotal
        });

        const mailOptions = {
            to: quotation.email,
            subject: 'Confirmación de pago recibido',
            htmlContent,
            attachments: [
                {
                    filename: data.file.originalname,
                    path: data.file.path
                }
            ]
        };

        await sendMail(mailOptions.to, mailOptions.subject, mailOptions.htmlContent, mailOptions.attachments);

        await transaction.commit();

        return { pass, payment: paymentData };
    } catch (error) {
        await transaction.rollback();
        throw new Error(`Error al crear o actualizar el Pass: ${error.message}`);
    }
};

const getPassFile = async (idPass) => {
    try {
        const payment = await PassPayment.findOne({
            where: { id: idPass },
            attributes: ['file'],
        });

        if (!payment) {
            throw new Error(`No se encontró un archivo asociado al pase con id ${idPass}`);
        }

        return payment.file;
    } catch (error) {
        throw new Error(`Error al recuperar el archivo del pase: ${error.message}`);
    }
};

const getPassById = async (quotationId) => {
    return await Pass.findOne({
        where: { quotationId },
        include: [
            {
                model: PassPayment,
                as: 'PassPayments',
            },
        ],
    });
};

const getAllPasses = async () => {
    return await Pass.findAll({
        include: [
            {
                model: PassPayment,
                as: 'PassPayments',
            },
        ],
    });
};

const updatePass = async (id, data) => {
    const pass = await Pass.findByPk(id);
    if (!pass) {
        throw new Error('Pase no encontrado');
    }
    return await pass.update(data);
};

const deletePass = async (id) => {
    const pass = await Pass.findByPk(id);
    if (!pass) {
        throw new Error('Pase no encontrado');
    }
    await pass.destroy();
};

module.exports = {
    createPass,
    getPassById,
    getAllPasses,
    updatePass,
    deletePass,
    getPassFile
};
