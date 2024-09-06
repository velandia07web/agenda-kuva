const { matchedData } = require('express-validator')
const stadeEvent = require('../services/stadeEventService')

const getAllStadeEvents = async function (req, res) {
  try {
    const allEvents = await stadeEvent.getAllStadeEvent()
    return res.status(200).json({ status: 200, message: 'Roles:', data: allEvents })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los estados de los eventos.', error: error.message })
  }
}

const getOneStadeEvents = async function (req, res) {
  try {
    const event = await stadeEvent.getOneStadeEvent(req.params.id)
    if (event) {
      return res.status(200).json({ status: 200, message: 'Estado del evento por ID:', data: event })
    } else {
      return res.status(404).json({ status: 404, message: 'Estado del evento no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el Estado del evento por ID.', error: error.message })
  }
}

const createStadeEvents = async function (req, res) {
  try {
    // Extraer solo los datos validados
    const validData = matchedData(req)

    // Usar los datos validados para crear el Estado del evento
    const createEvent = await stadeEvent.createStadeEvent(validData)
    return res.status(201).json({ status: 201, message: 'Estado del evento creado satisfactoriamente', data: createEvent })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el Estado del evento.', error: error.message })
  }
}

const updateStadeEvents = async function (req, res) {
  try {
    const idEvent = req.params.id

    if (!idEvent) {
      return res.status(404).json({ status: 404, message: 'Estado del evento no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedRol = await stadeEvent.updateStadeEvent(idEvent, validData)
    return res.status(200).json({ status: 200, message: 'Estado del evento actualizado satisfactoriamente', data: updatedRol })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el Estado del evento.', error: error.message })
  }
}

const deleteStadeEvents = async function (req, res) {
  try {
    const deletedEvent = await stadeEvent.deleteStadeEvent(req.params.id)
    if (deletedEvent) {
      return res.status(200).json({ status: 200, message: 'Estado del evento eliminado satisfactoriamente', data: deletedEvent })
    } else {
      return res.status(404).json({ status: 404, message: 'Estado del evento no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el Estado del evento.', error: error.message })
  }
}

module.exports = {
  getAllStadeEvents,
  getOneStadeEvents,
  createStadeEvents,
  updateStadeEvents,
  deleteStadeEvents
}
