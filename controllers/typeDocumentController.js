const { matchedData } = require('express-validator')
const typeDocumentService = require('../services/typeDocumentService')

const getAllTypeDocuments = async function (req, res) {
  try {
    const typeDocument = await typeDocumentService.getAllTypeDocument()
    return res.status(200).json({ status: 200, message: 'Roles:', data: typeDocument })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los roles.', error: error.message })
  }
}

const getOneTypeDocuments = async function (req, res) {
  try {
    const document = await typeDocumentService.getOneTypeDocument(req.params.id)
    if (document) {
      return res.status(200).json({ status: 200, message: 'Documento por ID:', data: document })
    } else {
      return res.status(404).json({ status: 404, message: 'Documento no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el Documento por ID.', error: error.message })
  }
}

const createTypeDocuments = async function (req, res) {
  try {
    // Extraer solo los datos validados
    const validData = matchedData(req)

    // Usar los datos validados para crear el Documento
    const createDocument = await typeDocumentService.createTypeDocument(validData)
    return res.status(201).json({ status: 201, message: 'Documento creado satisfactoriamente', data: createDocument })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el Documento.', error: error.message })
  }
}

const updatedDocument = async function (req, res) {
  try {
    const idDocument = req.params.id

    if (!idDocument) {
      return res.status(404).json({ status: 404, message: 'Documento no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedDocument = await typeDocumentService.updateTypeDocument(idDocument, validData)
    return res.status(200).json({ status: 200, message: 'Documento actualizado satisfactoriamente', data: updatedDocument })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el Documento.', error: error.message })
  }
}

const deleteDocument = async function (req, res) {
  try {
    const deletedDocumento = await typeDocumentService.deleteTypeDocument(req.params.id)
    if (deletedDocumento) {
      return res.status(200).json({ status: 200, message: 'Documento eliminado satisfactoriamente', data: deletedDocumento })
    } else {
      return res.status(404).json({ status: 404, message: 'Documento no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el Documento.', error: error.message })
  }
}

module.exports = {
  getAllTypeDocuments,
  getOneTypeDocuments,
  createTypeDocuments,
  updatedDocument,
  deleteDocument
}
