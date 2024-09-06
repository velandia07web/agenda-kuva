const rol = require('../models').TypeClient

const getAllTypeClients = async function () {
  try {
    return await rol.findAndCountAll()
  } catch (error) {
    throw new Error(`Error al obtener los type clients: ${error.message}`)
  }
}

const getOneTypeClient = async function (id) {
  try {
    return await rol.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el type client: ${error.message}`)
  }
}

const createTypeClient = async function (body) {
  try {
    return await rol.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el type client: ${error.message}`)
  }
}

const updateTypeClient = async function (id, body) {
  try {
    return await rol.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el type client: ${error.message}`)
  }
}

const deleteTypeClient = async function (id) {
  try {
    const deletedCount = await rol.destroy({ where: { id } })
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
