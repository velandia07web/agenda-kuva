const { Zone, City, Product, Pack } = require('../models')

const getAllZones = async function () {
  try {
    const zones = await Zone.findAndCountAll({
      order: [['name', 'ASC']]
    })
    return zones
  } catch (error) {
    console.error(`Error al obtener las zonas: ${error.message}`)
    throw new Error(`Error al obtener las zonas: ${error.message}`)
  }
}

const getOneZone = async function (id) {
  try {
    return await Zone.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el Zona: ${error.message}`)
  }
}

const createZone = async function (body) {
  try {
    return await Zone.create({
      name: body.name,
      state: "ACTIVO"
    })
  } catch (error) {
    throw new Error(`Error al crear el Zona: ${error.message}`)
  }
}

const updateZone = async function (id, body) {
  try {
    return await Zone.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el Zona: ${error.message}`)
  }
}

const deleteZone = async function (id) {
  try {
    const zone = await Zone.findOne({ where: { id } });

    if (!zone) {
      throw new Error(`Zona con id ${id} no encontrada`);
    }

    const newState = zone.state === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    const updatedCount = await Zone.update(
      { state: newState },
      { where: { id } }
    );

    if (updatedCount[0] === 0) {
      throw new Error(`No se pudo actualizar el estado de la zona con id ${id}`);
    }

    return { id, newState };
  } catch (error) {
    throw new Error(`Error al alternar el estado de la zona: ${error.message}`);
  }
}

const getZone = async function (body) {
  try {
    return await Zone.findOne({
      where: { name: body.name },
      include: [{
        model: City,
        as: 'cities'
      }],
      order: [[{ model: City, as: 'cities' }, 'name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener la Zona y sus ciudades: ${error.message}`)
  }
}

const getZonesWithProducts = async function () {
  try {
    const zones = await Zone.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: Product,
        as: 'Product',
        attributes: [],
        required: true,
      }],
      where: {
        state: 'ACTIVO',
      },
      group: ['Zone.id'],
      raw: true,
    });

    return zones;
  } catch (error) {
    throw new Error(`Error al obtener las zonas con productos: ${error.message}`);
  }
};

const getZonesWithPacks = async function () {
  try {
    const zones = await Zone.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: Pack,
        as: 'Pack',
        attributes: [],
        required: true,
      }],
      where: {
        state: 'ACTIVO',
      },
      group: ['Zone.id'],
      raw: true,
    });

    return zones;
  } catch (error) {
    throw new Error(`Error al obtener las zonas con packs: ${error.message}`);
  }
};

module.exports = {
  getAllZones,
  getOneZone,
  createZone,
  updateZone,
  deleteZone,
  getZone,
  getZonesWithProducts,
  getZonesWithPacks
}
