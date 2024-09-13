const { matchedData } = require('express-validator')
const addService = require('../services/addService')

const getAllAdd = async function (req, res) {
  try {
    const allAdds = await addService.getAllAdds()
    return res.status(200).json({ status: 200, message: 'Adds:', data: allAdds })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los adds.', error: error.message })
  }
}

const getOneAdds = async function (req, res) {
  try {
    const add = await addService.getOneAdd(req.params.id)
    if (add) {
      return res.status(200).json({ status: 200, message: 'Add por ID:', data: add })
    } else {
      return res.status(404).json({ status: 404, message: 'Add no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el add por ID.', error: error.message })
  }
}

const createAdds = async function (req, res) {
  try {
    const validData = matchedData(req)
    const createAdd = await addService.createAdd(validData)
    return res.status(201).json({ status: 201, message: 'Add creado satisfactoriamente', data: createAdd })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el add.', error: error.message })
  }
}

const updateAdd = async function (req, res) {
  try {
    const idAdd = req.params.id

    if (!idAdd) {
      return res.status(404).json({ status: 404, message: 'Add no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedAdd = await addService.updateAdd(idAdd, validData)
    return res.status(200).json({ status: 200, message: 'Add actualizado satisfactoriamente', data: updatedAdd })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el add.', error: error.message })
  }
}

const deleteAdd = async function (req, res) {
  try {
    const deletedAdd = await addService.deleteAdd(req.params.id)
    if (deletedAdd) {
      return res.status(200).json({ status: 200, message: 'Add eliminado satisfactoriamente', data: deletedAdd })
    } else {
      return res.status(404).json({ status: 404, message: 'Add no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el add.', error: error.message })
  }
}

module.exports = {
  getAllAdd,
  getOneAdds,
  createAdds,
  updateAdd,
  deleteAdd
}
