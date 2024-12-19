const packController = require('../controllers/packController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/pack')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', packController.getAllPacks)
  .get('/prices', packController.getPricePacks)
  .get('/:id', validatorGetItem, packController.getOnePacks)
  .get('/zone/:idZone', packController.getPacksByZone)


router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, packController.createPacks)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, packController.updatePack)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, packController.deletePack)

module.exports = router
