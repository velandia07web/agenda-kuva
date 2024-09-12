const typePriceController = require('../controllers/typePriceController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/rol')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador']))

router
  .get('/', typePriceController.getAllRols)
  .get('/:id', validatorGetItem, typePriceController.getOneRols)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, typePriceController.createRols)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, typePriceController.updateRol)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, typePriceController.deleteRol)

module.exports = router
