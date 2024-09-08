const { matchedData } = require('express-validator')
const authService = require('../services/authService')

const registerUsers = async function (req, res) {
  try {
    const validData = matchedData(req)
    const createUser = await authService.registerUser(validData)
    return res.status(201).json({ status: 201, message: 'User registrado satisfactoriamente', data: createUser })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al registrado el user.', error: error.message })
  }
}

const loginUsers = async function (req, res) {
  try {
    const validData = matchedData(req)
    const login = await authService.loginUser(res, validData)
    if (!login) return
    return res.status(200).json({ status: 200, message: 'User autenticado satisfactoriamente', data: login })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al autenticado el user.', error: error.message })
  }
}

const logoutUser = async function (req, res) {
  try {
    const validData = matchedData(req)
    const logout = await authService.logoutUser(validData)
    return res.status(200).json({ status: 200, message: 'Logout exitoso', data: logout })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al autenticado el user.', error: error.message })
  }
}

module.exports = {
  registerUsers,
  loginUsers,
  logoutUser
}