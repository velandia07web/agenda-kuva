const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateItem = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('El campo full name es obligatorio')
    .isString()
    .withMessage('El campo full name debe ser una cadena de texto')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('El campo full name solo puede contener letras y espacios'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('El campo full name es obligatorio')
    .isString()
    .withMessage('El campo full name debe ser una cadena de texto')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('El campo full name solo puede contener letras y espacios'),
  check('CC')
    .exists({ checkFalsy: true })
    .withMessage('El campo CC es obligatorio')
    .notEmpty()
    .withMessage('El campo CC no debe estar vacío')
    .isString()
    .withMessage('El campo CC debe ser una cadena de texto'),

  check('idTypeClient')
    .exists({ checkFalsy: true })
    .withMessage('El campo idTypeClient es obligatorio')
    .notEmpty()
    .withMessage('El campo idTypeClient no debe estar vacío')
    .isUUID(4)
    .withMessage('El campo idTypeClient debe ser un UUID válido'),

  check('email')
    .exists({ checkFalsy: true })
    .withMessage('El campo email es obligatorio')
    .notEmpty()
    .withMessage('El campo email no debe estar vacío')
    .isEmail()
    .withMessage('El campo email debe ser un correo electrónico válido'),

  check('idCompany')
    .optional()
    .isUUID(4),

  check('celphone')
    .exists({ checkFalsy: true })
    .withMessage('El campo celphone es obligatorio')
    .notEmpty()
    .withMessage('El campo celphone no debe estar vacío')
    .isString()
    .withMessage('El campo celphone debe ser una cadena de texto'),

  check('charge')
    .optional()
    .isString()
    .withMessage('El campo charge debe ser una cadena de texto'),

  check('idUser')
    .exists({ checkFalsy: true })
    .withMessage('El campo idUser es obligatorio')
    .notEmpty()
    .withMessage('El campo idUser no debe estar vacío')
    .isUUID(4)
    .withMessage('El campo idUser debe ser un UUID válido'),

  check('idSocialMedia')
    .exists({ checkFalsy: true })
    .withMessage('El campo idSocialMedia es obligatorio')
    .notEmpty()
    .withMessage('El campo idSocialMedia no debe estar vacío')
    .isUUID(4)
    .withMessage('El campo idSocialMedia debe ser un UUID válido'),

  check('idQuotation')
    .optional()
    .isUUID(4)
    .withMessage('El campo idQuotation debe ser un UUID válido'),

  check('cupoCopado')
      .isInt({ min: 0 })
      .withMessage('El campo cupo copado debe ser un número entero positivo'),

  check('cupoDisponible')
      .isInt({ min: 0 })
      .withMessage('El campo cupo disponible debe ser un número entero positivo'),

  validateResults
]

const validatorGetItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID(4)
    .withMessage('El campo id debe ser un UUID válido'),
  validateResults
]

const validatorUpdateItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID(4)
    .withMessage('El campo id debe ser un UUID válido'),

  check('name')
    .exists({ checkFalsy: true })
    .withMessage('El campo full name es obligatorio')
    .isString()
    .withMessage('El campo full name debe ser una cadena de texto')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('El campo full name solo puede contener letras y espacios'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('El campo full name es obligatorio')
    .isString()
    .withMessage('El campo full name debe ser una cadena de texto')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('El campo full name solo puede contener letras y espacios'),

  check('CC')
    .optional()
    .isString()
    .withMessage('El campo CC debe ser una cadena de texto'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('El campo email debe ser un correo electrónico válido'),

  check('celphone')
    .optional()
    .isString()
    .withMessage('El campo celphone debe ser una cadena de texto'),

  check('charge')
    .optional()
    .isString()
    .withMessage('El campo charge debe ser una cadena de texto'),

  check('cupoCopado')
      .isInt({ min: 0 })
      .withMessage('El campo cupo copado debe ser un número entero positivo'),

  check('cupoDisponible')
      .isInt({ min: 0 })
      .withMessage('El campo cupo disponible debe ser un número entero positivo'),

  validateResults
]

const validatorDeleteItem = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID(4)
    .withMessage('El campo id debe ser un UUID válido'),
  validateResults
]

module.exports = {
  validatorCreateItem,
  validatorGetItem,
  validatorUpdateItem,
  validatorDeleteItem
}
