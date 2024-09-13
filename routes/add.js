const addController = require('../controllers/addController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/add')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', addController.getAllAdd)
  .get('/:id', validatorGetItem, addController.getOneAdds)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, addController.createAdds)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, addController.updateAdd)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, addController.deleteAdd)

module.exports = router
