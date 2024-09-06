const typeClientController = require('../controllers/typeClientController')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/typeClient')
const router = Router()

router
  .get('/', typeClientController.getAllTypeClients)

  .get('/:id', validatorGetItem, typeClientController.getOneTypeClients)

  .post('/', validatorCreateItem, typeClientController.createTypeClients)

  .put('/:id', validatorUpdateItem, typeClientController.updateTypeClient)

  .delete('/:id', validatorDeleteItem, typeClientController.deleteTypeClient)

module.exports = router
