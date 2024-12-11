const productController = require('../controllers/productController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/product')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', productController.getAllProducts)
  .get('/products-data', productController.getProductsDataByTypePrice)
  .get('/prices', productController.getPriceProducts)
  .get('/prices-by-zone', productController.getPriceProductsByZone)
  .get('/:id', validatorGetItem, productController.getOneProducts)
  .put('/product-price/:id', productController.updateProductPrice)
  .delete('/product-price/:id', productController.deleteProductPrice);


router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, productController.createProducts)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, productController.updateProduct)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, productController.deleteProduct)

module.exports = router
