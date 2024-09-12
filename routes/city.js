const zoneController = require('../controllers/cityController')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/city')
const router = Router()

router
  .get('/', zoneController.getAllCities)
  .get('/:id', validatorGetItem, zoneController.getOneCities)
  .post('/', validatorCreateItem, zoneController.createCities)
  .put('/:id', validatorUpdateItem, zoneController.updateCities)
  .delete('/:id', validatorDeleteItem, zoneController.deleteCities)

module.exports = router
