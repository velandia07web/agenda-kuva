const socialMediaController = require('../controllers/socialMedialController')
const authMiddlewareRol = require('../middlewares/sessionRol')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/socialMedia')
const router = Router()

router.use(authMiddlewareRol(['Administrador', 'Superadministrador', 'Coordinador', 'Logistico', 'Comercial', 'Contable', 'Diseñador']))

router
  .get('/', socialMediaController.getAllSocialMedias)
  .get('/:id', validatorGetItem, socialMediaController.getOneSocialMedias)

router
  .post('/', authMiddlewareRol(['Superadministrador']), validatorCreateItem, socialMediaController.createSocialMedias)
  .put('/:id', authMiddlewareRol(['Superadministrador']), validatorUpdateItem, socialMediaController.updateSocialMedia)
  .delete('/:id', authMiddlewareRol(['Superadministrador']), validatorDeleteItem, socialMediaController.deleteSocialMedia)

module.exports = router
