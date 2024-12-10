const zoneController = require('../controllers/zoneController')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem, validatorGet } = require('../validators/zone')
const router = Router()

router
  .get('/', zoneController.getAllZones)
  .get('/zones-with-products', zoneController.getZonesWithProducts)
  .get('/cities', validatorGet, zoneController.getZones)
  .get('/:id', validatorGetItem, zoneController.getOneZones)
  .post('/', validatorCreateItem, zoneController.createZones)
  .put('/:id', validatorUpdateItem, zoneController.updateZones)
  .delete('/:id', validatorDeleteItem, zoneController.deleteZones)

module.exports = router
