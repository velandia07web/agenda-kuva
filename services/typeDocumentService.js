const { TypeDocument } = require('../models')

const getAllTypeDocument = async function () {
  try {
    return await TypeDocument.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los tipos de documentos: ${error.message}`)
  }
}

const getOneTypeDocument = async function (id) {
  try {
    return await TypeDocument.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el tipo de documento: ${error.message}`)
  }
}

const createTypeDocument = async function (body) {
  try {
    return await TypeDocument.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el tipo de documento: ${error.message}`)
  }
}

const updateTypeDocument = async function (id, body) {
  try {
    return await TypeDocument.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el tipo de documento: ${error.message}`)
  }
}

const deleteTypeDocument = async function (id) {
  try {
    const deletedCount = await TypeDocument.destroy({ where: { id } })
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
