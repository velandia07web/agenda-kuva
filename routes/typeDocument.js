const typeDocumentController = require('../controllers/typeDocumentController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/typeDocument')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', typeDocumentController.getAllTypeDocuments)
  .get('/:id', validatorGetItem, typeDocumentController.getOneTypeDocuments)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, typeDocumentController.createTypeDocuments)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, typeDocumentController.updatedDocument)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, typeDocumentController.deleteDocument)

module.exports = router
