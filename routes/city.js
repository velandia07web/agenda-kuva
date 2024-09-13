const zoneController = require('../controllers/cityController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/city')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', zoneController.getAllCities)
  .get('/:id', validatorGetItem, zoneController.getOneCities)

router
  .post('/', validatorCreateItem, zoneController.createCities)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, zoneController.updateCities)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, zoneController.deleteCities)

module.exports = router
