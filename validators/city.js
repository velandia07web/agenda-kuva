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
  check('idZone')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID('4')
    .withMessage('El campo id debe ser un UUID válido'),
  check('state')
    .optional(),
  check('transportPrice')
    .optional(),
  validateResults
]

const validatorGetItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID('4')
    .withMessage('El campo id debe ser un UUID válido'),
  validateResults
]

const validatorUpdateItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID('4')
    .withMessage('El campo id debe ser un UUID válido'),
  check('name')
    .optional()
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  check('idZone')
    .optional()
    .isString()
    .withMessage('El campo idZone debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9-\s]+$/)
    .withMessage('El campo idZone solo puede contener letras, números y espacios'),
  check('state')
    .optional(),
  check('transportPrice')
    .optional(),  
  validateResults
]

const validatorDeleteItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
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
