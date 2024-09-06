const { matchedData } = require('express-validator')
const typeClienteService = require('../services/typeClienteService')

const getAllTypeClients = async function (req, res) {
  try {
    const allTypeClients = await typeClienteService.getAllTypeClients()
    return res.status(200).json({ status: 200, message: 'Type clients:', data: allTypeClients })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los type clients.', error: error.message })
  }
}

const getOneTypeClients = async function (req, res) {
  try {
    const typeClient = await typeClienteService.getOneTypeClient(req.params.id)
    if (typeClient) {
      return res.status(200).json({ status: 200, message: 'Type Client por ID:', data: typeClient })
    } else {
      return res.status(404).json({ status: 404, message: 'Type Client no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el type client por ID.', error: error.message })
  }
}

const createTypeClients = async function (req, res) {
  try {
    // Extraer solo los datos validados
    const validData = matchedData(req)

    // Usar los datos validados para crear el rol
    const createTypeClient = await typeClienteService.createTypeClient(validData)
    return res.status(201).json({ status: 201, message: 'Type Client creado satisfactoriamente', data: createTypeClient })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el type client.', error: error.message })
  }
}

const updateTypeClient = async function (req, res) {
  try {
    const idTypeClient = req.params.id

    if (!idTypeClient) {
      return res.status(404).json({ status: 404, message: 'Type Client no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedTypeClient = await typeClienteService.updateTypeClient(idTypeClient, validData)
    return res.status(200).json({ status: 200, message: 'Type Client actualizado satisfactoriamente', data: updatedTypeClient })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el type client.', error: error.message })
  }
}

const deleteTypeClient = async function (req, res) {
  try {
    const deletedTypeClient = await typeClienteService.deleteTypeClient(req.params.id)
    if (deletedTypeClient) {
      return res.status(200).json({ status: 200, message: 'Type Client eliminado satisfactoriamente', data: deletedTypeClient })
    } else {
      return res.status(404).json({ status: 404, message: 'Type Client no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el type client.', error: error.message })
  }
}

module.exports = {
  getAllTypeClients,
  getOneTypeClients,
  createTypeClients,
  updateTypeClient,
  deleteTypeClient
}
