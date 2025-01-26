const stadeEventController = require('../controllers/stadeEventController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/stadeevent')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', stadeEventController.getAllStadeEvents)
  .get('/:id', validatorGetItem, stadeEventController.getOneStadeEvents)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, stadeEventController.createStadeEvents)
  .put('/:id', authMiddlewareRol(['Superadministrador', 'Administrador']), validatorUpdateItem, stadeEventController.updateStadeEvents)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, stadeEventController.deleteStadeEvents)

module.exports = router
