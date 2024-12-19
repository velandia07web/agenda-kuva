const { PricePack } = require('../models')

const getAllPricePacks = async function () {
  try {
    return await PricePack.findAndCountAll({
      order: [['id', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los price packs: ${error.message}`)
  }
}

const getOnePricePack = async function (id) {
  try {
    return await PricePack.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el Price Pack: ${error.message}`)
  }
}

const createPricePack = async function (body) {
  try {
    return await PricePack.create({
      price: body.price,
      idPack: body.idPack
    })
  } catch (error) {
    throw new Error(`Error al crear el Price Pack: ${error.message}`)
  }
}

const updatePricePack = async function (id, body) {
  try {
    return await PricePack.update({
      price: body.price,
      priceDeadHour: body.priceDeadHour
    }, { where: { idPack: id } })
  } catch (error) {
    throw new Error(`Error al actualizar el Price Pack: ${error.message}`)
  }
}

const deletePricePack = async function (id) {
  try {
    const deletedCount = await PricePack.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Price Pack con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el Price Pack: ${error.message}`)
  }
}

module.exports = {
  getAllPricePacks,
  getOnePricePack,
  createPricePack,
  updatePricePack,
  deletePricePack
}
