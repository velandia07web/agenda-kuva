const { matchedData } = require('express-validator')
const cityService = require('../services/cityService')

const getAllCities = async function (req, res) {
  try {
    const allCities = await cityService.getAllCities()
    return res.status(200).json({ status: 200, message: 'Ciudades:', data: allCities })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener las ciudades.', error: error.message })
  }
}

const getOneCities = async function (req, res) {
  try {
    const city = await cityService.getOneCity(req.params.id)

    if (!city) {
      return res.status(404).json({ status: 404, message: 'Ciudad no encontrada.' })
    } else {
      return res.status(200).json({ status: 200, message: 'Ciudad por ID:', data: city })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener la ciudad por ID.', error: error.message })
  }
}

const createCities = async function (req, res) {
  try {
    const validData = matchedData(req)
    const createCity = await cityService.createCity(validData)
    return res.status(201).json({ status: 201, message: 'Ciudad creada satisfactoriamente', data: createCity })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear la ciudad.', error: error.message })
  }
}

const updateCities = async function (req, res) {
  try {
    const idCity = req.params.id

    if (!idCity) {
      return res.status(404).json({ status: 404, message: 'Ciudad no encontrada.' })
    }

    const validData = matchedData(req)

    const updatedCity = await cityService.updateCity(idCity, validData)
    return res.status(200).json({ status: 200, message: 'Ciudad actualizada satisfactoriamente', data: updatedCity })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar la ciudad.', error: error.message })
  }
}

const deleteCities = async function (req, res) {
  try {
    const deletedCity = await cityService.deleteCity(req.params.id)
    if (deletedCity) {
      return res.status(200).json({ status: 200, message: 'Ciudad eliminada satisfactoriamente', data: deletedCity })
    } else {
      return res.status(404).json({ status: 404, message: 'Ciudad no encontrada.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar la ciudad.', error: error.message })
  }
}

module.exports = {
  getAllCities,
  getOneCities,
  createCities,
  updateCities,
  deleteCities
}
