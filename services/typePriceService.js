const { TypePrice } = require('../models')

const getAllTypePrices = async function () {
  try {
    return await TypePrice.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los type prices: ${error.message}`)
  }
}

const getOneTypePrice = async function (id) {
  try {
    return await TypePrice.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el type price: ${error.message}`)
  }
}

const createTypePrice = async function (body) {
  try {
    return await TypePrice.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el type price: ${error.message}`)
  }
}

const updateTypePrice = async function (id, body) {
  try {
    return await TypePrice.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el type price: ${error.message}`)
  }
}

const deleteTypePrice = async function (id) {
  try {
    const deletedCount = await TypePrice.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Type Price con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el type price: ${error.message}`)
  }
}

module.exports = {
  getAllTypePrices,
  getOneTypePrice,
  createTypePrice,
  updateTypePrice,
  deleteTypePrice
}
