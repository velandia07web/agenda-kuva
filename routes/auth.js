const authcontroller = require('../controllers/authController')
const { Router } = require('express')
const { validatorCreateItem, validatorLogin, validatorLogout } = require('../validators/auth')
const router = Router()

router

  .post('/register', validatorCreateItem, authcontroller.registerUsers)
  .post('/login', validatorLogin, authcontroller.loginUsers)
  .post('/:id', validatorLogout, authcontroller.logoutUser)
  .post('/forgotPassword', authcontroller.forgotPassword)
  .patch('/resetPassword/:token', authcontroller.resetPassword)

module.exports = router
