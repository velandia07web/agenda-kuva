const { matchedData } = require('express-validator')
const rolService = require('../services/rolService')
const jwt = require('jsonwebtoken');


const getAllRols = async function (req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    console.log("miramops el token", token);
    if (!token) {
      console.log("estamos aqui ?? ");
      return res.status(401).json({ status: 401, message: 'Token de autenticación no proporcionado.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Usa tu clave secreta definida en las variables de entorno
    } catch (error) {
      return res.status(403).json({ status: 403, message: 'Token no válido.' });
    }

    // Obtener ID de usuario y empresa del token
    const userId = decoded.userId;
    const companyId = decoded.companyId;
    
    const allRols = await rolService.getAllRols()
    return res.status(200).json({ status: 200, message: 'Roles:', data: allRols })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener los roles.', error: error.message })
  }
}

const getOneRols = async function (req, res) {
  try {
    const rol = await rolService.getOneRol(req.params.id)
    if (rol) {
      return res.status(200).json({ status: 200, message: 'Rol por ID:', data: rol })
    } else {
      return res.status(404).json({ status: 404, message: 'Rol no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al obtener el rol por ID.', error: error.message })
  }
}

const createRols = async function (req, res) {
  try {
    // Extraer solo los datos validados
    const validData = matchedData(req)

    // Usar los datos validados para crear el rol
    const createRol = await rolService.createRol(validData)
    return res.status(201).json({ status: 201, message: 'Rol creado satisfactoriamente', data: createRol })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al crear el rol.', error: error.message })
  }
}

const updateRol = async function (req, res) {
  try {
    const idRol = req.params.id

    if (!idRol) {
      return res.status(404).json({ status: 404, message: 'Rol no encontrado.' })
    }

    const validData = matchedData(req)

    const updatedRol = await rolService.updateRol(idRol, validData)
    return res.status(200).json({ status: 200, message: 'Rol actualizado satisfactoriamente', data: updatedRol })
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al actualizar el rol.', error: error.message })
  }
}

const deleteRol = async function (req, res) {
  try {
    const deletedRol = await rolService.deleteRol(req.params.id)
    if (deletedRol) {
      return res.status(200).json({ status: 200, message: 'Rol eliminado satisfactoriamente', data: deletedRol })
    } else {
      return res.status(404).json({ status: 404, message: 'Rol no encontrado.' })
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error al eliminar el rol.', error: error.message })
  }
}

module.exports = {
  getAllRols,
  getOneRols,
  createRols,
  updateRol,
  deleteRol
}
