const { matchedData } = require('express-validator')
const zoneServices = require('../services/zoneServices')

const getAllZones = async function (req, res) {
  try {
    const allZones = await zoneServices.getAllZones()
    return res.status(200).json({ status: 200, message: 'Zonas:', data: allZones })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener las zonas.', error: error.message })
  }
}

const getOneZones = async function (req, res) {
  try {
    const zone = await zoneServices.getOneZone(req.params.id)

    if (!zone) {
      return res.status(404).json({ status: 404, message: 'Zona no encontrada.' })
    } else {
      return res.status(200).json({ status: 200, message: 'Zona por ID:', data: zone })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener la zona por ID.', error: error.message })
  }
}

const createZones = async function (req, res) {
  try {
    const validData = matchedData(req)
    const createZone = await zoneServices.createZone(validData)
    return res.status(201).json({ status: 201, message: 'Zona creada satisfactoriamente', data: createZone })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear la zona.', error: error.message })
  }
}

const updateZones = async function (req, res) {
  try {
    const idZone = req.params.id

    if (!idZone) {
      return res.status(404).json({ status: 404, message: 'Zona no encontrada.' })
    }

    const validData = matchedData(req)

    const updatedRol = await zoneServices.updateZone(idZone, validData)
    return res.status(200).json({ status: 200, message: 'Zona actualizada satisfactoriamente', data: updatedRol })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar la zona.', error: error.message })
  }
}

const deleteZones = async function (req, res) {
  try {
    const deletedZone = await zoneServices.deleteZone(req.params.id)
    if (deletedZone) {
      return res.status(200).json({ status: 200, message: 'Zona eliminada satisfactoriamente', data: deletedZone })
    } else {
      return res.status(404).json({ status: 404, message: 'Zona no encontrada.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar la zona.', error: error.message })
  }
}

const getZones = async function (req, res) {
  try {
    const validData = matchedData(req)
    const zone = await zoneServices.getZone(validData)
    return res.status(200).json({ status: 200, message: 'Zona creada satisfactoriamente', data: zone })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener la zona por ID.', error: error.message })
  }
}

module.exports = {
  getAllZones,
  getOneZones,
  createZones,
  updateZones,
  deleteZones,
  getZones
}
