const { StateQuotation } = require('../models')

const getAllStateQuotation = async function () {
  try {
    return await StateQuotation.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los estados de las cotizaciones: ${error.message}`)
  }
}

const getOneStateQuotation = async function (id) {
  try {
    return await StateQuotation.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el estado de la cotización: ${error.message}`)
  }
}

const createStateQuotation = async function (body) {
  try {
    return await StateQuotation.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el estado de la cotización: ${error.message}`)
  }
}

const updateStateQuotation = async function (id, body) {
  try {
    return await StateQuotation.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el estado de la cotización: ${error.message}`)
  }
}

const deleteStateQuotation = async function (id) {
  try {
    const deletedCount = await StateQuotation.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Estado de la cotización con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el estado de la cotización: ${error.message}`)
  }
}

module.exports = {
  getAllStateQuotation,
  getOneStateQuotation,
  createStateQuotation,
  updateStateQuotation,
  deleteStateQuotation
}
