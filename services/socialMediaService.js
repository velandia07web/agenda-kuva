const socialMedia = require('../models').SocialMedia

const getAllSocialMedias = async function () {
  try {
    return await socialMedia.findAndCountAll()
  } catch (error) {
    throw new Error(`Error al obtener los social medias: ${error.message}`)
  }
}

const getOneSocialMedia = async function (id) {
  try {
    return await socialMedia.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el rol: ${error.message}`)
  }
}

const createSocialMedia = async function (body) {
  try {
    return await socialMedia.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el social media: ${error.message}`)
  }
}

const updateSocialMedia = async function (id, body) {
  try {
    return await socialMedia.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el social media: ${error.message}`)
  }
}

const deleteSocialMedia = async function (id) {
  try {
    const deletedCount = await socialMedia.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Social media con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el social media: ${error.message}`)
  }
}

module.exports = {
  getAllSocialMedias,
  getOneSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia
}
