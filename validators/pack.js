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
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('El campo description es obligatorio')
    .notEmpty()
    .withMessage('El campo description no debe estar vacío')
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('idProduct')
    .exists({ checkFalsy: true })
    .withMessage('El campo id product es obligatorio')
    .isString()
    .withMessage('El campo id product debe ser una cadena de texto'),
  check('idZone')
    .exists({ checkFalsy: true })
    .withMessage('El campo id product es obligatorio')
    .isString()
    .withMessage('El campo id product debe ser una cadena de texto'),
  check('state')
      .optional(),
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
  check('description')
    .optional()
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('idProduct')
    .exists({ checkFalsy: true })
    .withMessage('El campo id product es obligatorio')
    .isString()
    .withMessage('El campo id product debe ser una cadena de texto'),
  check('idZone')
    .exists({ checkFalsy: true })
    .withMessage('El campo id product es obligatorio')
    .isString()
    .withMessage('El campo id product debe ser una cadena de texto'),
  check('state')
      .optional(),
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
