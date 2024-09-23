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
  check('email')
    .exists()
    .withMessage('El campo email es obligatorio')
    .isEmail()
    .withMessage('El campo email debe ser un correo electrónico válido'),
  check('cedula')
    .exists({ checkFalsy: true })
    .withMessage('El campo cedula es obligatorio')
    .notEmpty()
    .withMessage('El campo cedula no debe estar vacío')
    .isInt({ min: 0 })
    .withMessage('El campo cedula debe ser un número entero positivo'),
  check('phone')
    .exists({ checkFalsy: true })
    .withMessage('El campo phone es obligatorio')
    .notEmpty()
    .withMessage('El campo phone no debe estar vacío')
    .isInt({ min: 0 })
    .withMessage('El campo phone debe ser un número entero positivo'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('El campo password es obligatorio')
    .isLength({ min: 8 })
    .withMessage('El campo password debe tener al menos 8 caracteres')
    .matches(/[A-Z]/)
    .withMessage('El campo password debe contener al menos una letra mayúscula')
    .matches(/[a-z]/)
    .withMessage('El campo password debe contener al menos una letra minúscula')
    .matches(/\d/)
    .withMessage('El campo password debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('El campo password debe contener al menos un carácter especial')
    .matches(/^[^<>]*$/)
    .withMessage('El campo password no debe contener los caracteres < o > para evitar inyecciones'),
  check('idRol')
    .exists({ checkFalsy: true })
    .withMessage('El campo id rol es obligatorio')
    .isString()
    .withMessage('El campo id rol debe ser una cadena de texto'),
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
  check('email')
    .optional()
    .isEmail()
    .withMessage('El campo email debe ser un correo electrónico válido'),
  check('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('El campo password debe tener al menos 8 caracteres')
    .matches(/[A-Z]/)
    .withMessage('El campo password debe contener al menos una letra mayúscula')
    .matches(/[a-z]/)
    .withMessage('El campo password debe contener al menos una letra minúscula')
    .matches(/\d/)
    .withMessage('El campo password debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('El campo password debe contener al menos un carácter especial')
    .matches(/^[^<>]*$/)
    .withMessage('El campo password no debe contener los caracteres < o > para evitar inyecciones'),
  check('idRol')
    .exists({ checkFalsy: true })
    .withMessage('El campo id rol es obligatorio')
    .isString()
    .withMessage('El campo id rol debe ser una cadena de texto'),
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
