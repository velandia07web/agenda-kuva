const { matchedData } = require('express-validator')
const stateQuotationsService = require('../services/stateQuotationsService')

const getAllStateQuotations = async function (req, res) {
  try {
    const allStateQuotations = await stateQuotationsService.getAllStateQuotation()
    return res.status(200).json({ status: 200, message: 'Estado de las cotizaciones:', data: allStateQuotations })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los estado de las cotizaciones.', error: error.message })
  }
}

const getOneStateQuotations = async function (req, res) {
  try {
    const stateQuotations = await stateQuotationsService.getOneStateQuotation(req.params.id)
    if (stateQuotations) {
      return res.status(200).json({ status: 200, message: 'Estado de la cotización por ID:', data: stateQuotations })
    } else {
      return res.status(404).json({ status: 404, message: 'Estado de la cotización no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el estado de la cotización por ID.', error: error.message })
  }
}

const createStateQuotations = async function (req, res) {
  try {
    const validData = matchedData(req)
    const createStateQuotation = await stateQuotationsService.createStateQuotation(validData)
    return res.status(201).json({ status: 201, message: 'Estado de la cotización creado satisfactoriamente', data: createStateQuotation })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el estado de la cotización.', error: error.message })
  }
}

const updateStateQuotations = async function (req, res) {
  try {
    const idCreateStateQuotation = req.params.id

    if (!idCreateStateQuotation) {
      return res.status(404).json({ status: 404, message: 'Estado de la cotización no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedRol = await stateQuotationsService.updateStateQuotation(idCreateStateQuotation, validData)
    return res.status(200).json({ status: 200, message: 'Estado de la cotización actualizado satisfactoriamente', data: updatedRol })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el estado de la cotización.', error: error.message })
  }
}

const deleteStateQuotations = async function (req, res) {
  try {
    const deletedStateQuotation = await stateQuotationsService.deleteStateQuotation(req.params.id)
    if (deletedStateQuotation) {
      return res.status(200).json({ status: 200, message: 'Estado de la cotización eliminado satisfactoriamente', data: deletedStateQuotation })
    } else {
      return res.status(404).json({ status: 404, message: 'Estado de la cotización no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el estado de la cotización.', error: error.message })
  }
}

module.exports = {
  getAllStateQuotations,
  getOneStateQuotations,
  createStateQuotations,
  updateStateQuotations,
  deleteStateQuotations
}
