const { Client } = require('../models')

const getAllClient = async function () {
  try {
    return await Client.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los clientes: ${error.message}`)
  }
}

const getOneClient = async function (id) {
  try {
    return await Client.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el cliente: ${error.message}`)
  }
}

const createClient = async function (body) {
  try {
    return await Client.create({
      name: body.name,
      lastName: body.lastName,
      idZone: body.idZone,
      CC: body.CC,
      idTypeClient: body.idTypeClient,
      idTypeDocument: body.idTypeDocument,
      numberDocument: body.numberDocument,
      email: body.email,
      company: body.company,
      celphone: body.celphone,
      charge: body.charge,
      idUser: body.idUser,
      idSocialMedia: body.idSocialMedia,
      cupoDisponible: body.cupoDisponible,
      cupoCopado: body.cupoCopado
    })
  } catch (error) {
    throw new Error(`Error al crear el cliente: ${error.message}`)
  }
}

const updateClient = async function (id, body) {
  try {
    return await Client.update({
      name: body.name,
      lastName: body.lastName,
      idZone: body.idZone,
      CC: body.CC,
      idTypeClient: body.idTypeClient,
      idTypeDocument: body.idTypeDocument,
      numberDocument: body.numberDocument,
      email: body.email,
      company: body.company,
      celphone: body.celphone,
      charge: body.charge,
      idUser: body.idUser,
      idSocialMedia: body.idSocialMedia,
      cupoDisponible: body.cupoDisponible,
      cupoCopado: body.cupoCopado
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el cliente: ${error.message}`)
  }
}

const deleteClient = async function (id) {
  try {
    const deletedCount = await Client.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Cliente con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el cliente: ${error.message}`)
  }
}

module.exports = {
  getAllClient,
  getOneClient,
  createClient,
  updateClient,
  deleteClient
}
