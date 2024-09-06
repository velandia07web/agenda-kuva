const rolController = require('../controllers/rolController')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/rol')
const router = Router()

router
  .get('/', rolController.getAllRols)

  .get('/:id', validatorGetItem, rolController.getOneRols)

  .post('/', validatorCreateItem, rolController.createRols)

  .put('/:id', validatorUpdateItem, rolController.updateRol)

  .delete('/:id', validatorDeleteItem, rolController.deleteRol)

module.exports = router
