const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateItem = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('El campo name es obligatorio')
    .isString()
    .withMessage('El campo name debe ser una cadena de texto')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('El campo name solo puede contener letras'),
  check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('El campo lastName es obligatorio')
      .isString()
      .withMessage('El campo lastName debe ser una cadena de texto')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('El campo lastName solo puede contener letras'),
  check('email')
    .exists()
    .withMessage('El campo email es obligatorio')
    .isEmail()
    .withMessage('El campo email debe ser un correo electrónico válido'),
  check('cedula')
      .exists({ checkFalsy: true })
      .withMessage('El campo cedula es obligatorio')
      .isString()
      .withMessage('El campo cedula debe ser una cadena de texto')
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage('El campo cedula solo puede contener letras y números'),
  check('phone')
      .exists({ checkFalsy: true })
      .withMessage('El campo phone es obligatorio')
      .isNumeric()
      .withMessage('El campo phone debe contener solo números')
      .isLength({ min: 6 })
      .withMessage('El campo phone debe tener al menos 6 dígitos'),
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
  check('verifyPassword')
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
  check('idZone')
      .exists({ checkFalsy: true })
      .withMessage('El campo idZone es obligatorio'),
  validateResults
]

const validatorLogin = [
  check('email')
    .exists()
    .withMessage('El campo email es obligatorio')
    .isEmail()
    .withMessage('El campo email debe ser un correo electrónico válido'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('El campo password es obligatorio')
    .matches(/^[^<>]*$/)
    .withMessage('El campo password no debe contener los caracteres < o > para evitar inyecciones'),
  validateResults
]

const validatorLogout = [
  check('id')
    .exists({ checkFalsy: true })
    .withMessage('El campo id es obligatorio')
    .notEmpty()
    .withMessage('El campo id no debe estar vacío')
    .isUUID('4') // Valida que sea un UUID v4
    .withMessage('El campo id debe ser un UUID válido'),
  validateResults
]

const validatorForgotPassword = [
  check('email')
    .exists()
    .withMessage('El campo email es obligatorio')
    .isEmail()
    .withMessage('El campo email debe ser un correo electrónico válido'),
  validateResults
]

module.exports = {
  validatorCreateItem,
  validatorLogin,
  validatorLogout,
  validatorForgotPassword
}
