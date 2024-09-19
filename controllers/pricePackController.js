const { matchedData } = require('express-validator')
const pricePackService = require('../services/pricePackService')

const getAllPricePacks = async function (req, res) {
  try {
    const allPricePacks = await pricePackService.getAllPricePacks()
    return res.status(200).json({ status: 200, message: 'Price Packs:', data: allPricePacks })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los price packs.', error: error.message })
  }
}

const getOnePricePacks = async function (req, res) {
  try {
    const pricePack = await pricePackService.getOnePricePack(req.params.id)
    if (pricePack) {
      return res.status(200).json({ status: 200, message: 'Price Pack por ID:', data: pricePack })
    } else {
      return res.status(404).json({ status: 404, message: 'Price Pack no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el price pack por ID.', error: error.message })
  }
}

const createPricePacks = async function (req, res) {
  try {
    const validData = matchedData(req)
    const createPricePack = await pricePackService.createPricePack(validData)
    return res.status(201).json({ status: 201, message: 'Price Pack creado satisfactoriamente', data: createPricePack })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el price pack.', error: error.message })
  }
}

const updatePricePack = async function (req, res) {
  try {
    const idPricePack = req.params.id

    if (!idPricePack) {
      return res.status(404).json({ status: 404, message: 'Price Pack no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedPricePack = await pricePackService.updatePricePack(idPricePack, validData)
    return res.status(200).json({ status: 200, message: 'Price Pack actualizado satisfactoriamente', data: updatedPricePack })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el price pack.', error: error.message })
  }
}

const deletePricePack = async function (req, res) {
  try {
    const deletedPricePack = await pricePackService.deletePricePack(req.params.id)
    if (deletedPricePack) {
      return res.status(200).json({ status: 200, message: 'Price Pack eliminado satisfactoriamente', data: deletedPricePack })
    } else {
      return res.status(404).json({ status: 404, message: 'Price Pack no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el price pack.', error: error.message })
  }
}

module.exports = {
  getAllPricePacks,
  getOnePricePacks,
  createPricePacks,
  updatePricePack,
  deletePricePack
}
