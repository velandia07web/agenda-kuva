const { matchedData } = require('express-validator')
const socialMediaService = require('../services/socialMediaService')

const getAllSocialMedias = async function (req, res) {
  try {
    const allSocialMedias = await socialMediaService.getAllSocialMedias()
    return res.status(200).json({ status: 200, message: 'Social Medias:', data: allSocialMedias })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los social medias.', error: error.message })
  }
}

const getOneSocialMedias = async function (req, res) {
  try {
    const socialMedia = await socialMediaService.getOneSocialMedia(req.params.id)
    if (socialMedia) {
      return res.status(200).json({ status: 200, message: 'Social Media por ID:', data: socialMedia })
    } else {
      return res.status(404).json({ status: 404, message: 'Social media no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el social media por ID.', error: error.message })
  }
}

const createSocialMedias = async function (req, res) {
  try {
    // Extraer solo los datos validados
    const validData = matchedData(req)

    // Usar los datos validados para crear el social media
    const createSocialMedia = await socialMediaService.createSocialMedia(validData)
    return res.status(201).json({ status: 201, message: 'Social Media creado satisfactoriamente', data: createSocialMedia })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el social media.', error: error.message })
  }
}

const updateSocialMedia = async function (req, res) {
  try {
    const idSocialMedia = req.params.id

    if (!idSocialMedia) {
      return res.status(404).json({ status: 404, message: 'Social Media no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedSocialMedia = await socialMediaService.updateSocialMedia(idSocialMedia, validData)
    return res.status(200).json({ status: 200, message: 'Social Media actualizado satisfactoriamente', data: updatedSocialMedia })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el social media.', error: error.message })
  }
}

const deleteSocialMedia = async function (req, res) {
  try {
    const deletedSocialMedia = await socialMediaService.deleteSocialMedia(req.params.id)
    if (deletedSocialMedia) {
      return res.status(200).json({ status: 200, message: 'Social Media activado/desactivado satisfactoriamente', data: deletedSocialMedia })
    } else {
      return res.status(404).json({ status: 404, message: 'Social Media no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al activar/desacticar el social media.', error: error.message })
  }
}

module.exports = {
  getAllSocialMedias,
  getOneSocialMedias,
  createSocialMedias,
  updateSocialMedia,
  deleteSocialMedia
}
