const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateItem = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('El campo name es obligatorio')
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('imagen')
    .exists({ checkFalsy: true })
    .withMessage('El campo imagen es obligatorio')
    .notEmpty()
    .withMessage('El campo imagen no debe estar vacío'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('El campo description es obligatorio')
    .notEmpty()
    .withMessage('El campo description no debe estar vacío')
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('count')
    .exists({ checkFalsy: true })
    .withMessage('El campo count es obligatorio')
    .notEmpty()
    .withMessage('El campo phone no debe estar vacío')
    .isInt({ min: 0 })
    .withMessage('El campo phone debe ser un número entero positivo'),
  check('idZone')
    .exists({ checkFalsy: true })
    .withMessage('El campo id rol es obligatorio')
    .isString()
    .withMessage('El campo id rol debe ser una cadena de texto'),
  validateResults // Esta función es la que se encarga de manejar los resultados de la validación
]

const validatorGetItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID('4') // Valida que sea un UUID v4
    .withMessage('El campo id debe ser un UUID válido'),
  validateResults
]

const validatorUpdateItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .isUUID('4')
    .withMessage('El campo id debe ser un UUID válido'),
  check('name')
    .optional()
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('imagen')
    .optional()
    .isString()
    .withMessage('El campo imagen debe ser una cadena de texto'),
  check('description')
    .optional()
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('count')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El campo price debe ser un número entero positivo'),
  check('idZone')
    .exists({ checkFalsy: true })
    .withMessage('El campo id zone es obligatorio')
    .isString()
    .withMessage('El campo id zone debe ser una cadena de texto'),
  validateResults
]

const validatorDeleteItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .isUUID('4')
    .withMessage('El campo id debe ser un UUID válido'),
  validateResults
]

module.exports = {
  validatorCreateItem,
  validatorGetItem,
  validatorUpdateItem,
  validatorDeleteItem
}
