const typeClientController = require('../controllers/typeClientController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/typeClient')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', typeClientController.getAllTypeClients)
  .get('/:id', validatorGetItem, typeClientController.getOneTypeClients)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, typeClientController.createTypeClients)
  .put('/:id', authMiddlewareRol(['Superadministrador', 'Administrador']), validatorUpdateItem, typeClientController.updateTypeClient)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, typeClientController.deleteTypeClient)

module.exports = router
