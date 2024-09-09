const { check } = require('express-validator')
const validateResults = require('../utils/handleValidator')

const validatorCreateItem = [
  check('fullName')
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
module.exports = {
  validatorCreateItem,
  validatorLogin,
  validatorLogout
}
