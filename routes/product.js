const productController = require('../controllers/productController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/product')
const router = Router()
const upload = require('../utils/uploadConfig');

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
  .put('/:id', authMiddlewareRol(['Superadministrador', 'Administrador']), validatorUpdateItem, productController.updateProduct)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, productController.deleteProduct)

router.post('/', 
  authMiddlewareRol(['Superadministrador']), 
  upload.single('imagen'),
  productController.createProducts
);

module.exports = router
