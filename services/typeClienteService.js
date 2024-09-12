const { TypeClient } = require('../models')

const getAllTypeClients = async function () {
  try {
    return await TypeClient.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los type clients: ${error.message}`)
  }
}

const getOneTypeClient = async function (id) {
  try {
    return await TypeClient.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el type client: ${error.message}`)
  }
}

const createTypeClient = async function (body) {
  try {
    return await TypeClient.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el type client: ${error.message}`)
  }
}

const updateTypeClient = async function (id, body) {
  try {
    return await TypeClient.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el type client: ${error.message}`)
  }
}

const deleteTypeClient = async function (id) {
  try {
    const deletedCount = await TypeClient.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Type Client con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el type client: ${error.message}`)
  }
}

module.exports = {
  getAllTypeClients,
  getOneTypeClient,
  createTypeClient,
  updateTypeClient,
  deleteTypeClient
}
