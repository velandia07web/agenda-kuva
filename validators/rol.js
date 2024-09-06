const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateItem = [
  check('name')
    .exists()
    .withMessage('El campo name es obligatorio')
    .notEmpty()
    .withMessage('El campo name no debe estar vacío')
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  validateResults
]

const validatorGetItem = [
  check('id')
    .exists()
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isInt()
    .withMessage('El campo id debe ser un número entero'),
  validateResults
]

const validatorUpdateItem = [
  check('id')
    .exists()
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isInt()
    .withMessage('El campo id debe ser un número entero'),
  check('name')
    .optional() // Permite que el campo sea opcional en la actualización
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('El campo name solo puede contener letras, números y espacios'),
  validateResults
]

const validatorDeleteItem = [
  check('id')
    .exists()
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isInt()
    .withMessage('El campo id debe ser un número entero'),
  validateResults
]

module.exports = {
  validatorCreateItem,
  validatorGetItem,
  validatorUpdateItem,
  validatorDeleteItem
}
