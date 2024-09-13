const { Zone, City } = require('../models')

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
      name: body.name
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
    const deletedCount = await Zone.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Zona con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el Zona: ${error.message}`)
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

module.exports = {
  getAllZones,
  getOneZone,
  createZone,
  updateZone,
  deleteZone,
  getZone
}
