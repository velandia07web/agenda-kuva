const typeDocument = require('../models').TypeDocument

const getAllTypeDocument = async function () {
  try {
    return await typeDocument.findAndCountAll()
  } catch (error) {
    throw new Error(`Error al obtener los tipos de documentos: ${error.message}`)
  }
}

const getOneTypeDocument = async function (id) {
  try {
    return await typeDocument.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el tipo de documento: ${error.message}`)
  }
}

const createTypeDocument = async function (body) {
  try {
    return await typeDocument.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el tipo de documento: ${error.message}`)
  }
}

const updateTypeDocument = async function (id, body) {
  try {
    return await typeDocument.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el tipo de documento: ${error.message}`)
  }
}

const deleteTypeDocument = async function (id) {
  try {
    const deletedCount = await typeDocument.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`typeDocument con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el tipo de documento: ${error.message}`)
  }
}

module.exports = {
  getAllTypeDocument,
  getOneTypeDocument,
  createTypeDocument,
  updateTypeDocument,
  deleteTypeDocument
}
