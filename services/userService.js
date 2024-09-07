const user = require('../models').User
const { encrypt } = require('../utils/handlePassword')

const getAllUsers = async function () {
  try {
    return await user.findAndCountAll({
      attributes: { exclude: ['password'] }
    })
  } catch (error) {
    throw new Error(`Error al obtener los users: ${error.message}`)
  }
}

const getOneUser = async function (id) {
  try {
    return await user.findOne(
      {
        where: { id },
        attributes: { exclude: ['password'] }
      }
    )
  } catch (error) {
    throw new Error(`Error al obtener el user: ${error.message}`)
  }
}

const createUser = async function (body) {
  try {
    const data = await encrypt(body.password)
    console.log('password', data)
    return await user.create({
      fullName: body.fullName,
      email: body.email,
      password: data,
      idRol: body.idRol
    })
  } catch (error) {
    throw new Error(`Error al crear el user: ${error.message}`)
  }
}

const updateUser = async function (id, body) {
  try {
    // Crear un objeto con los campos que se van a actualizar
    const updateData = {
      fullName: body.fullName,
      email: body.email,
      idRol: body.idRol
    }

    // Si la contraseña está presente en el body y no está vacía, encriptarla
    if (body.password && body.password.trim() !== '') {
      const encryptedPassword = await encrypt(body.password)
      updateData.password = encryptedPassword
    }

    // Actualizar el usuario solo con los campos presentes en updateData
    return await user.update(updateData, { where: { id } })
  } catch (error) {
    throw new Error(`Error al actualizar el user: ${error.message}`)
  }
}

const deleteUser = async function (id) {
  try {
    const deletedCount = await user.destroy({ where: { id } })
    if (deletedCount === 0) {
      throw new Error(`User con id ${id} no encontrado`)
    }
    return deletedCount
  } catch (error) {
    throw new Error(`Error al eliminar el user: ${error.message}`)
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
}
