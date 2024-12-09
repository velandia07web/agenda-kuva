const { Cabin, CabinPrice } = require('../models');

const getAllCabins = async function () {
    try {
        return await Cabin.findAndCountAll({
            include: [
                {
                    model: CabinPrice,
                    as: 'Prices',
                    attributes: ['typeEvent', 'pricePerHour', 'priceInit', 'deadHourPrice']
                }
            ],
            order: [['name', 'ASC']]
        });
    } catch (error) {
        throw new Error(`Error al obtener las Cabinas: ${error.message}`);
    }
};

const getOneCabin = async function (id) {
    try {
        return await Cabin.findOne({
            where: { id },
            include: [
                {
                    model: CabinPrice,
                    as: 'Prices',
                    attributes: ['typeEvent', 'pricePerHour', 'priceInit', 'deadHourPrice']
                }
            ]
        });
    } catch (error) {
        throw new Error(`Error al obtener la cabina: ${error.message}`);
    }
};

const createCabin = async function (body) {
    try {
        return await Cabin.create(body, {
            include: [
                {
                    model: CabinPrice,
                    as: 'Prices'
                }
            ]
        });
    } catch (error) {
        throw new Error(`Error al crear la cabina: ${error.message}`);
    }
};

const updateCabin = async function (id, body) {
    try {
        return await Cabin.update(body, { where: { id } });
    } catch (error) {
        throw new Error(`Error al actualizar la cabina: ${error.message}`);
    }
};

const deleteCabin = async function (id) {
    try {
        const deletedCount = await Cabin.destroy({ where: { id } });
        if (deletedCount === 0) {
            throw new Error(`Cabina con id ${id} no encontrada`);
        }
        return deletedCount;
    } catch (error) {
        throw new Error(`Error al eliminar la cabina: ${error.message}`);
    }
};

module.exports = {
    getAllCabins,
    getOneCabin,
    createCabin,
    updateCabin,
    deleteCabin
};