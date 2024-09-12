const { StadeEvent } = require('../models')

const getAllStadeEvent = async function () {
  try {
    return await StadeEvent.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los estados de los eventos: ${error.message}`)
  }
}

const getOneStadeEvent = async function (id) {
  try {
    return await StadeEvent.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el estado del evento: ${error.message}`)
  }
}

const createStadeEvent = async function (body) {
  try {
    return await StadeEvent.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el estado del evento: ${error.message}`)
  }
}

const updateStadeEvent = async function (id, body) {
  try {
    return await StadeEvent.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el estado del evento: ${error.message}`)
  }
}

const deleteStadeEvent = async function (id) {
  try {
    const deletedCount = await StadeEvent.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Estado del evento con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el estado del evento: ${error.message}`)
  }
}

module.exports = {
  getAllStadeEvent,
  getOneStadeEvent,
  createStadeEvent,
  updateStadeEvent,
  deleteStadeEvent
}
