const clientController = require('../controllers/clientController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/client')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', clientController.getAllClients)
  .get('/:id', validatorGetItem, clientController.getOneClients)

router
  .post('/', authMiddlewareRol(['Superadministrador', 'Administrador', 'Comercial']), validatorCreateItem, clientController.createClients)
  .put('/:id', authMiddlewareRol(['Superadministrador', 'Administrador', 'Comercial']), validatorUpdateItem, clientController.updateClients)
  .delete('/:id', authMiddlewareRol(['Superadministrador', 'Administrador']), validatorDeleteItem, clientController.deleteClients)

module.exports = router
