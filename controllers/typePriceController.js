const { matchedData } = require('express-validator')
const typePriceService = require('../services/typePriceService')

const getAllTypePrices = async function (req, res) {
  try {
    const allTypePrices = await typePriceService.getAllTypePrices()
    return res.status(200).json({ status: 200, message: 'Type Prices:', data: allTypePrices })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los type prices.', error: error.message })
  }
}

const getOneTypePrices = async function (req, res) {
  try {
    const typePrice = await typePriceService.getOneTypePrice(req.params.id)
    if (typePrice) {
      return res.status(200).json({ status: 200, message: 'Type Price por ID:', data: typePrice })
    } else {
      return res.status(404).json({ status: 404, message: 'Type Price no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el type price por ID.', error: error.message })
  }
}

const createTypePrices = async function (req, res) {
  try {
    // Extraer solo los datos validados
    const validData = matchedData(req)

    // Usar los datos validados para crear el type price
    const createTypePrice = await typePriceService.createTypePrice(validData)
    return res.status(201).json({ status: 201, message: 'Type Price creado satisfactoriamente', data: createTypePrice })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el type price.', error: error.message })
  }
}

const updateTypePrice = async function (req, res) {
  try {
    const idTypePrice = req.params.id

    if (!idTypePrice) {
      return res.status(404).json({ status: 404, message: 'Type Price no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedTypePrice = await typePriceService.updateTypePrice(idTypePrice, validData)
    return res.status(200).json({ status: 200, message: 'Type Price actualizado satisfactoriamente', data: updatedTypePrice })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el type price.', error: error.message })
  }
}

const deleteTypePrice = async function (req, res) {
  try {
    const deletedTypePrice = await typePriceService.deleteTypePrice(req.params.id)
    if (deletedTypePrice) {
      return res.status(200).json({ status: 200, message: 'Type Price eliminado satisfactoriamente', data: deletedTypePrice })
    } else {
      return res.status(404).json({ status: 404, message: 'Type Price no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el type price.', error: error.message })
  }
}

module.exports = {
  getAllTypePrices,
  getOneTypePrices,
  createTypePrices,
  updateTypePrice,
  deleteTypePrice
}
