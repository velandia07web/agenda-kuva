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
      .withMessage('El campo description debe ser una cadena de texto')
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage('El campo description solo puede contener letras, números y espacios'),

  check('idZone')
      .exists({ checkFalsy: true })
      .withMessage('El campo idZone es obligatorio')
      .isUUID()
      .withMessage('El campo idZone debe ser un UUID válido'),
  check('count')
      .optional()
      .isInt({ min: 0 })
      .withMessage('El campo count debe ser un número entero positivo'),
  check('state')
      .optional(),  
  check('prices')
      .optional()
      .isArray()
      .withMessage('El campo prices debe ser un arreglo')
      .custom((prices) => {
        prices.forEach(price => {
          if (!price.hour || typeof price.hour !== 'string') {
            throw new Error('Cada precio debe tener un campo hour válido');
          }
          if (price.price === undefined || typeof price.price !== 'number') {
            throw new Error('Cada precio debe tener un campo price válido y ser un número');
          }
          if (price.priceDeadHour === undefined || typeof price.priceDeadHour !== 'number') {
            throw new Error('Cada precio debe tener un campo priceDeadHour válido y ser un número');
          }
        });
        return true;
      }),

  validateResults,
];

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
    .withMessage('El campo count debe ser un número entero positivo'),
  check('idZone')
    .exists({ checkFalsy: true })
    .withMessage('El campo id zone es obligatorio')
    .isString()
    .withMessage('El campo id zone debe ser una cadena de texto'),
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
