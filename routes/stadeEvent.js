const stadeEventController = require('../controllers/stadeEventController')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/stadeevent')
const router = Router()

router
  .get('/', stadeEventController.getAllStadeEvents)

  .get('/:id', validatorGetItem, stadeEventController.getOneStadeEvents)

  .post('/', validatorCreateItem, stadeEventController.createStadeEvents)

  .put('/:id', validatorUpdateItem, stadeEventController.updateStadeEvents)

  .delete('/:id', validatorDeleteItem, stadeEventController.deleteStadeEvents)

module.exports = router
