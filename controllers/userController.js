const { matchedData } = require('express-validator')
const userService = require('../services/userService')

const getAllUsers = async function (req, res) {
  try {
    const allUsers = await userService.getAllUsers()
    return res.status(200).json({ status: 200, message: 'Users:', data: allUsers })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los users.', error: error.message })
  }
}

const getOneUsers = async function (req, res) {
  try {
    const user = await userService.getOneUser(req.params.id)
    if (user) {
      return res.status(200).json({ status: 200, message: 'User por ID:', data: user })
    } else {
      return res.status(404).json({ status: 404, message: 'User no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el user por ID.', error: error.message })
  }
}

const createUsers = async function (req, res) {
  try {
    // Extraer solo los datos validados
    // const validData = matchedData(req.body)
    // console.log('data', validData)
    // Usar los datos validados para crear el user
    const createUser = await userService.createUser(req.body)
    return res.status(201).json({ status: 201, message: 'User creado satisfactoriamente', data: createUser })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el user.', error: error.message })
  }
}

const updateUser = async function (req, res) {
  try {
    const idUser = req.params.id

    if (!idUser) {
      return res.status(404).json({ status: 404, message: 'User no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedRol = await userService.updateUser(idUser, validData)
    return res.status(200).json({ status: 200, message: 'User actualizado satisfactoriamente', data: updatedRol })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el user.', error: error.message })
  }
}

const deleteUser = async function (req, res) {
  try {
    const deletedUser = await userService.deleteUser(req.params.id)
    if (deletedUser) {
      return res.status(200).json({ status: 200, message: 'User eliminado satisfactoriamente', data: deletedUser })
    } else {
      return res.status(404).json({ status: 404, message: 'User no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el user.', error: error.message })
  }
}

module.exports = {
  getAllUsers,
  getOneUsers,
  createUsers,
  updateUser,
  deleteUser
}
