const stateQuotationController = require('../controllers/stateQuotationController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/stateQuotation')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador']))

router
  .get('/', stateQuotationController.getAllStateQuotations)
  .get('/:id', validatorGetItem, stateQuotationController.getOneStateQuotations)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, stateQuotationController.createStateQuotations)
  .put('/:id', authMiddlewareRol(['Superadministrador', 'Administrador']), validatorUpdateItem, stateQuotationController.updateStateQuotations)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, stateQuotationController.deleteStateQuotations)

module.exports = router
