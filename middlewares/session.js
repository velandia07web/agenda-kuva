const { handleHttpError } = require('../utils/handleError')
const { verifyToken } = require('../utils/handleJwt')

const authMiddleware = () => {
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

      next()
    } catch (error) {
      console.error('Auth Middleware Error:', error.message)
      return handleHttpError(res, 'Not Authorized', 401)
    }
  }
}

module.exports = authMiddleware
