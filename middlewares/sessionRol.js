const { handleHttpError } = require('../utils/handleError')
const { verifyToken } = require('../utils/handleJwt')
const { User, Rol } = require('../models')

const authMiddlewareRol = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return handleHttpError(res, 'No Token Provided', 401)
      }

      const token = req.headers.authorization.split(' ').pop()
      const dataToken = await verifyToken(token)
      if (!dataToken) {
        return handleHttpError(res, 'Invalid Token', 401)
      }

      const user = await User.findOne({
        where: { email: dataToken.email },
        attributes: ['idRol', 'jwt']
      })

      if (!user || !user.jwt) {
        return handleHttpError(res, 'User not found or JWT missing', 404)
      }

      const rol = await Rol.findOne({
        where: { id: user.idRol },
        attributes: ['name']
      })

      if (!rol || !requiredRoles.includes(rol.name)) {
        return handleHttpError(res, 'User not authorized for this role', 403)
      }

      next()
    } catch (error) {
      console.error('Auth Middleware Error:', error.message)
      return handleHttpError(res, 'Not Authorized', 401)
    }
  }
}

module.exports = authMiddlewareRol
