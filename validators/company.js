const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateItem = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('El campo name es obligatorio')
        .isString()
        .withMessage('El campo name debe ser una cadena de texto')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('El campo name solo puede contener letras y espacios'),

    check('legalName')
        .exists({ checkFalsy: true })
        .withMessage('El campo legalName es obligatorio')
        .isString()
        .withMessage('El campo legalName debe ser una cadena de texto'),

    check('email')
        .exists({ checkFalsy: true })
        .withMessage('El campo email es obligatorio')
        .isEmail()
        .withMessage('El campo email debe ser un correo electrónico válido'),

    check('phone')
        .exists({ checkFalsy: true })
        .withMessage('El campo phone es obligatorio')
        .isString()
        .withMessage('El campo phone debe ser una cadena de texto'),

    check('address')
        .optional()
        .isString()
        .withMessage('El campo address debe ser una cadena de texto'),

    check('website')
        .optional()
        .isString()
        .withMessage('El campo website debe ser una cadena de texto válida'),

    check('industry')
        .optional()
        .isString()
        .withMessage('El campo industry debe ser una cadena de texto'),

    check('clientId')
        .optional()
        .isUUID(4)
        .withMessage('El campo clientId debe ser un UUID válido'),

    check('idTypeDocument')
        .optional(),
    check('cupo')
        .optional(),    

    validateResults,
];

const validatorGetItem = [
    check('id')
        .exists({ checkFalsy: true })
        .withMessage('El campo id es obligatorio')
        .isUUID(4)
        .withMessage('El campo id debe ser un UUID válido'),
    validateResults,
];

const validatorUpdateItem = [
    check('id')
        .exists({ checkFalsy: true })
        .withMessage('El campo id es obligatorio')
        .isUUID(4)
        .withMessage('El campo id debe ser un UUID válido'),

    check('name')
        .optional()
        .isString()
        .withMessage('El campo name debe ser una cadena de texto')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('El campo name solo puede contener letras y espacios'),

    check('legalName')
        .optional()
        .isString()
        .withMessage('El campo legalName debe ser una cadena de texto'),

    check('email')
        .optional()
        .isEmail()
        .withMessage('El campo email debe ser un correo electrónico válido'),

    check('phone')
        .optional()
        .isString()
        .withMessage('El campo phone debe ser una cadena de texto'),

    check('address')
        .optional()
        .isString()
        .withMessage('El campo address debe ser una cadena de texto'),

    check('website')
        .optional()
        .isString()
        .withMessage('El campo website debe ser una cadena de texto válida'),

    check('industry')
        .optional()
        .isString()
        .withMessage('El campo industry debe ser una cadena de texto'),

    check('clientId')
        .optional()
        .isUUID(4)
        .withMessage('El campo clientId debe ser un UUID válido'),

    validateResults,
];

const validatorDeleteItem = [
    check('id')
        .exists({ checkFalsy: true })
        .withMessage('El campo id es obligatorio')
        .isUUID(4)
        .withMessage('El campo id debe ser un UUID válido'),
    validateResults,
];

module.exports = {
    validatorCreateItem,
    validatorGetItem,
    validatorUpdateItem,
    validatorDeleteItem,
};
