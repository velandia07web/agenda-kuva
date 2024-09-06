const rol = require('../models').Rol

const getAllRols = async function () {
  try {
    return await rol.findAndCountAll()
  } catch (error) {
    throw new Error(`Error al obtener los roles: ${error.message}`)
  }
}

const getOneRol = async function (id) {
  try {
    return await rol.findOne({ where: { id } })
  } catch (error) {
    throw new Error(`Error al obtener el Rol: ${error.message}`)
  }
}

const createRol = async function (body) {
  try {
    return await rol.create({
      name: body.name
    })
  } catch (error) {
    throw new Error(`Error al crear el rol: ${error.message}`)
  }
}

// Función para actualizar un rol existente por su ID
const updateRol = async function (id, body) {
  try {
    return await rol.update({
      name: body.name
    }, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el rol: ${error.message}`)
  }
}

// Función para eliminar un rol por su ID
const deleteRol = async function (id) {
  try {
    const deletedCount = await rol.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`rol con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el rol: ${error.message}`)
  }
}

module.exports = {
  getAllRols,
  getOneRol,
  createRol,
  updateRol,
  deleteRol
}
