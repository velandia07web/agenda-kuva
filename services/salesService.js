const { Sales, Quotation } = require('../models');

const createVenta = async (data) => {
    const quotation = await Quotation.findByPk(data.quotation_id);
    if (!quotation) {
        throw new Error('Quotation not found');
    }

    const venta = await Sales.create({
        quotation_id: data.quotation_id,
        subtotal: quotation.subtotal,
        iva: quotation.IVA,
        total: quotation.totalNet,
        costo_envio: data.costo_envio,
        metodo_pago: data.metodo_pago,
        plazo_pago: data.plazo_pago,
        deudas: data.deudas,
        dias_mora: data.dias_mora,
        abono: data.abono,
        id_cuentas: data.id_cuentas,
        orden_de_compra: data.orden_de_compra,
        numero_factura: data.numero_factura,
        estado: data.estado
    });

    return venta;
};

const getVentaById = async (id) => {
    return Sales.findByPk(id);
};

const getAllVentas = async () => {
    return Sales.findAll();
};

const updateVenta = async (id, updatedData) => {
    const venta = await Sales.findByPk(id);
    if (!venta) return null;
    return venta.update(updatedData);
};

const deleteVenta = async (id) => {
    const venta = await Sales.findByPk(id);
    if (!venta) return null;
    await venta.destroy();
    return venta;
};

module.exports = {
    createVenta,
    getVentaById,
    getAllVentas,
    updateVenta,
    deleteVenta
};
