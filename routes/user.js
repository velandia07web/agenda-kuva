const userController = require('../controllers/userController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/user')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', userController.getAllUsers)
  .get('/:id', validatorGetItem, userController.getOneUsers)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, userController.createUsers)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, userController.updateUser)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, userController.deleteUser)

module.exports = router
