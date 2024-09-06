const typeDocumentController = require('../controllers/typeDocumentController')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/typeDocument')
const router = Router()

router
  .get('/', typeDocumentController.getAllTypeDocuments)

  .get('/:id', validatorGetItem, typeDocumentController.getOneTypeDocuments)

  .post('/', validatorCreateItem, typeDocumentController.createTypeDocuments)

  .put('/:id', validatorUpdateItem, typeDocumentController.updatedDocument)

  .delete('/:id', validatorDeleteItem, typeDocumentController.deleteDocument)

module.exports = router
