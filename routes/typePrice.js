const typePriceController = require('../controllers/typePriceController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/typePrice')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador']))

router
  .get('/', typePriceController.getAllTypePrices)
  .get('/:id', validatorGetItem, typePriceController.getOneTypePrices)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, typePriceController.createTypePrices)
  .put('/:id', authMiddlewareRol(['Superadministrador', 'Administrador']), validatorUpdateItem, typePriceController.updateTypePrice)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, typePriceController.deleteTypePrice)

module.exports = router
