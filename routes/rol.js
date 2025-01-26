const rolController = require('../controllers/rolController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/rol')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', rolController.getAllRols)
  .get('/:id', validatorGetItem, rolController.getOneRols)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, rolController.createRols)
  .put('/:id', authMiddlewareRol(['Superadministrador', 'Administrador']), validatorUpdateItem, rolController.updateRol)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, rolController.deleteRol)

module.exports = router
