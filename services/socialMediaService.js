const { SocialMedia } = require('../models')

const getAllSocialMedias = async function (stateFilter = null) {
  try {
    const whereClause = stateFilter ? { state: stateFilter } : {};

    return await SocialMedia.findAndCountAll({
      where: whereClause,
      order: [['name', 'ASC']]
    });
  } catch (error) {
    throw new Error(`Error al obtener los social medias: ${error.message}`);
  }
};

const getOneSocialMedia = async function (id) {
  try {
    return await SocialMedia.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el rol: ${error.message}`)
  }
}

const createSocialMedia = async function (body) {
  try {
    return await SocialMedia.create({
      name: body.name,
      state: "ACTIVO"
    })
  } catch (error) {
    throw new Error(`Error al crear el social media: ${error.message}`)
  }
}

const updateSocialMedia = async function (id, body) {
  try {
    return await SocialMedia.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el social media: ${error.message}`)
  }
}

const deleteSocialMedia = async function (id) {
  try {
    const socialMedia = await SocialMedia.findOne({ where: { id } });

    if (!socialMedia) {
      throw new Error(`Social media con id ${id} no encontrado`);
    }

    const newState = socialMedia.state === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    const updatedCount = await SocialMedia.update(
      { state: newState },
      { where: { id } }
    );

    if (updatedCount[0] === 0) {
      throw new Error(`No se pudo actualizar el estado del social media con id ${id}`);
    }

    return { id, newState };
  } catch (error) {
    throw new Error(`Error al alternar el estado del social media: ${error.message}`);
  }
}

module.exports = {
  getAllSocialMedias,
  getOneSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia
}
