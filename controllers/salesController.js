const salesService = require('../services/salesService');

const getVenta = async (req, res) => {
    try {
        const venta = await salesService.getVentaById(req.params.id);
        if (!venta) {
            return res.status(404).json({
                status: 404,
                message: 'Venta no encontrada',
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Venta obtenida con éxito',
            data: venta,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener la venta',
            error: error.message,
        });
    }
};

const createSale = async (req, res) => {
    try {
        const sale = await salesService.createSale(req.body);
        return res.status(201).json({
            status: 201,
            message: 'Venta creada con éxito',
            data: sale,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al crear la venta',
            error: error.message,
        });
    }
};

const getAllSales = async (req, res) => {
    try {
        const sales = await salesService.getAllSales();
        return res.status(200).json({
            status: 200,
            message: 'Ventas obtenidas con éxito',
            data: sales,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: 'Error al obtener las ventas',
            error: error.message,
        });
    }
};

const updateSale = async (req, res) => {
    try {
        const updatedSale = await salesService.updateSale(req.params.id, req.body);
        return res.status(200).json({
            status: 200,
            message: 'Venta actualizada con éxito',
            data: updatedSale,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al actualizar la venta',
            error: error.message,
        });
    }
};

const deleteSale = async (req, res) => {
    try {
        await salesService.deleteSale(req.params.id);
        return res.status(200).json({
            status: 200,
            message: 'Venta eliminada con éxito',
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error al eliminar la venta',
            error: error.message,
        });
    }
};

const sendPdfByEmail = async (req, res) => {
    try {
        const { email } = req.body; 
        const pdfFile = req.file;

        if (!email || !pdfFile) {
            return res.status(400).json({
                status: 400,
                message: 'Debe proporcionar un correo electrónico y un archivo PDF',
            });
        }

        const pdfPath = path.join(__dirname, '../uploads', pdfFile.filename);

        const htmlTemplate = `
            <h1>Gracias por tu solicitud</h1>
            <p>Te enviamos el contrato como archivo adjunto.</p>
        `;

        await salesService.sendPdfByEmail(email, 'Documento Adjunto', htmlTemplate, pdfPath);

        fs.unlinkSync(pdfPath);

        return res.status(200).json({
            status: 200,
            message: 'Correo enviado con éxito',
        });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({
            status: 500,
            message: 'Error al enviar el correo',
            error: error.message,
        });
    }
};

module.exports = {
    getVenta,
    createSale,
    getAllSales,
    updateSale,
    deleteSale,
    sendPdfByEmail
};
