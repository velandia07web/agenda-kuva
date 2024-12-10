const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddlewareRol = require('../middlewares/sessionRol');
const {
    validatorCreateItem,
    validatorGetItem,
    validatorUpdateItem,
    validatorDeleteItem,
} = require('../validators/company');

router.use(authMiddlewareRol(['Administrador', 'Superadministrador']));

router
    .get('/', companyController.getAllCompanies)
    .get('/:id', validatorGetItem, companyController.getOneCompany)
    .post('/', validatorCreateItem, companyController.createCompany)
    .put('/:id', validatorUpdateItem, companyController.updateCompany)
    .delete('/:id', validatorDeleteItem, companyController.deleteCompany);

module.exports = router;