const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateItem = [
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('El campo price es obligatorio')
    .notEmpty()
    .withMessage('El campo price no debe estar vacío')
    .isInt({ min: 0 })
    .withMessage('El campo price debe ser un número entero positivo'),
  check('idPack')
    .exists({ checkFalsy: true })
    .withMessage('El campo id pack es obligatorio')
    .isString()
    .withMessage('El campo id pack debe ser una cadena de texto'),
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
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('El campo price es obligatorio')
    .notEmpty()
    .withMessage('El campo price no debe estar vacío')
    .isInt({ min: 0 })
    .withMessage('El campo price debe ser un número entero positivo'),
  check('idPack')
    .exists({ checkFalsy: true })
    .withMessage('El campo id pack es obligatorio')
    .isString()
    .withMessage('El campo id pack debe ser una cadena de texto'),
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
