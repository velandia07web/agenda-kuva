const { Rol } = require('../models')

const getAllRols = async function () {
  try {
    return await Rol.findAndCountAll({
      order: [['name', 'ASC']]
    })
  } catch (error) {
    throw new Error(`Error al obtener los roles: ${error.message}`)
  }
}

const getOneRol = async function (id) {
  try {
    return await Rol.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el Rol: ${error.message}`)
  }
}

const createRol = async function (body) {
  try {
    return await Rol.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el Rol: ${error.message}`)
  }
}

const updateRol = async function (id, body) {
  try {
    return await Rol.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el Rol: ${error.message}`)
  }
}

const deleteRol = async function (id) {
  try {
    const deletedCount = await Rol.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`Rol con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el Rol: ${error.message}`)
  }
}

module.exports = {
  getAllRols,
  getOneRol,
  createRol,
  updateRol,
  deleteRol
}
