const { matchedData } = require('express-validator')
const packService = require('../services/packService')

const getAllPacks = async function (req, res) {
  try {
    const allPacks = await packService.getAllPacks()
    return res.status(200).json({ status: 200, message: 'Packs:', data: allPacks })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los packs.', error: error.message })
  }
}

const getOnePacks = async function (req, res) {
  try {
    const pack = await packService.getOnePack(req.params.id)
    if (pack) {
      return res.status(200).json({ status: 200, message: 'Pack por ID:', data: pack })
    } else {
      return res.status(404).json({ status: 404, message: 'Pack no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el pack por ID.', error: error.message })
  }
}

const createPacks = async function (req, res) {
  try {
    const validData = matchedData(req)
    const createPack = await packService.createPack(validData)
    return res.status(201).json({ status: 201, message: 'Pack creado satisfactoriamente', data: createPack })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el pack.', error: error.message })
  }
}

const updatePack = async function (req, res) {
  try {
    const idPack = req.params.id

    if (!idPack) {
      return res.status(404).json({ status: 404, message: 'Pack no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedPack = await packService.updatePack(idPack, validData)
    return res.status(200).json({ status: 200, message: 'Pack actualizado satisfactoriamente', data: updatedPack })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el pack.', error: error.message })
  }
}

const deletePack = async function (req, res) {
  try {
    const deletedPack = await packService.deletePack(req.params.id)
    if (deletedPack) {
      return res.status(200).json({ status: 200, message: 'Pack eliminado satisfactoriamente', data: deletedPack })
    } else {
      return res.status(404).json({ status: 404, message: 'Pack no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el pack.', error: error.message })
  }
}

const getPricePacks = async function (req, res) {
  try {
    const pricePacks = await packService.getPricePacks();
    return res.status(200).json({
      status: 200,
      message: 'Price Packs obtenidos exitosamente',
      data: pricePacks,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error al obtener los Price Packs',
      error: error.message,
    });
  }
};

module.exports = {
  getAllPacks,
  getOnePacks,
  createPacks,
  updatePack,
  deletePack,
  getPricePacks
}
