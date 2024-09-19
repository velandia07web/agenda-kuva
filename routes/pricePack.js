const pricePackController = require('../controllers/pricePackController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/pricePack')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', pricePackController.getAllPricePacks)
  .get('/:id', validatorGetItem, pricePackController.getOnePricePacks)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, pricePackController.createPricePacks)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, pricePackController.updatePricePack)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, pricePackController.deletePricePack)

module.exports = router
