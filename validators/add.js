const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateItem = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('El campo name es obligatorio')
    .notEmpty()
    .withMessage('El campo name no debe estar vacío')
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('El campo price es obligatorio')
    .notEmpty()
    .withMessage('El campo price no debe estar vacío')
    .isInt({ min: 0 })
    .withMessage('El campo price debe ser un número entero positivo'),
  check('idTypePrice')
    .exists({ checkFalsy: true })
    .withMessage('El campo idTypePrice es obligatorio')
    .notEmpty()
    .withMessage('El campo idTypePrice no debe estar vacío')
    .isUUID('4')
    .withMessage('El campo idTypePrice debe ser un UUID válido'),
  validateResults
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
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID('4') // Valida que sea un UUID v4
    .withMessage('El campo id debe ser un UUID válido'),
  check('name')
    .optional() // Permite que el campo sea opcional en la actualización
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('price')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El campo price debe ser un número entero positivo'),
  check('idTypePrice')
    .optional()
    .isUUID('4')
    .withMessage('El campo idTypePrice debe ser un UUID válido'),
  validateResults
]

const validatorDeleteItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID('4') // Valida que sea un UUID v4
    .withMessage('El campo id debe ser un UUID válido'),
  validateResults
]

module.exports = {
  validatorCreateItem,
  validatorGetItem,
  validatorUpdateItem,
  validatorDeleteItem
}
