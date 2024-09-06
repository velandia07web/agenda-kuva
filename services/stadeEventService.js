const stadeEvent = require('../models').StadeEvent

const getAllStadeEvent = async function () {
  try {
    return await stadeEvent.findAndCountAll()
  } catch (error) {
    throw new Error(`Error al obtener los estados de los eventos: ${error.message}`)
  }
}

const getOneStadeEvent = async function (id) {
  try {
    return await stadeEvent.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el estado del evento: ${error.message}`)
  }
}

const createStadeEvent = async function (body) {
  try {
    return await stadeEvent.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el estado del evento: ${error.message}`)
  }
}

const updateStadeEvent = async function (id, body) {
  try {
    return await stadeEvent.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el estado del evento: ${error.message}`)
  }
}

const deleteStadeEvent = async function (id) {
  try {
    const deletedCount = await stadeEvent.destroy({ where: { id } })
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
