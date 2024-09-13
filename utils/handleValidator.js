const { validationResult } = require('express-validator')

/**
 * Si la validación del resultado es válida, se llama a `next`. Si la validación es inválida,
 * se envía un código 403 con mensajes genéricos.
 * @param req
 * @param res
 * @param next
 * @returns La función `next()` si todo va bien, o un error general en caso contrario.
 */
const validateResults = (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.error('Error de validadores', errors.errors)
      return res.status(403).json({
        errors: errors.array().map(err => ({
          field: err.param,
          message: 'Invalid input'
        }))
      })
    }
    return next()
  } catch (error) {
    return res.status(500).json({
      message: 'An unexpected error occurred'
    })
  }
}

module.exports = validateResults
