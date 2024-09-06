const socialMediaController = require('../controllers/socialMedialController')
const { Router } = require('express')
const { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem } = require('../validators/socialMedia')
const router = Router()

router
  .get('/', socialMediaController.getAllSocialMedias)

  .get('/:id', validatorGetItem, socialMediaController.getOneSocialMedias)

  .post('/', validatorCreateItem, socialMediaController.createSocialMedias)

  .put('/:id', validatorUpdateItem, socialMediaController.updateSocialMedia)

  .delete('/:id', validatorDeleteItem, socialMediaController.deleteSocialMedia)

module.exports = router
