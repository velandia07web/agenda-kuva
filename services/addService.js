const { Add } = require('../models')

const getAllAdds = async function () {
  try {
    return await Add.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los adds: ${error.message}`)
  }
}

const getOneAdd = async function (id) {
  try {
    return await Add.findOne(
      {
        where: { id }
      }
    )
  } catch (error) {
    throw new Error(`Error al obtener el Add: ${error.message}`)
  }
}

const createAdd = async function (body) {
  try {
    return await Add.create({
      name: body.name,
      price: body.price,
      idTypePrice: body.idTypePrice
    })
  } catch (error) {
    throw new Error(`Error al crear el add: ${error.message}`)
  }
}

const updateAdd = async function (id, body) {
  try {
    // Crear un objeto con los campos que se van a actualizar
    const updateData = {
      name: body.name,
      price: body.price,
      idTypePrice: body.idTypePrice
    }

    // Actualizar el usuario solo con los campos presentes en updateData
    return await Add.update(updateData, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el Add: ${error.message}`)
  }
}

const deleteAdd = async function (id) {
  try {
    const deletedCount = await Add.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Add con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el Add: ${error.message}`)
  }
}

module.exports = {
  getAllAdds,
  getOneAdd,
  createAdd,
  updateAdd,
  deleteAdd
}
