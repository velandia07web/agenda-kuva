const userController = require('../controllers/userController')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/user')
const router = Router()

router
  .get('/', userController.getAllUsers)

  .get('/:id', validatorGetItem, userController.getOneUsers)

  .post('/', validatorCreateItem, userController.createUsers)

  .put('/:id', validatorUpdateItem, userController.updateUser)

  .delete('/:id', validatorDeleteItem, userController.deleteUser)

module.exports = router
