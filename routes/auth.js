const authcontroller = require('../controllers/authController')
const authMiddleware = require('../middlewares/session')
const { Router } = require('express')
const { validatorCreateItem, validatorLogin, validatorLogout, validatorForgotPassword } = require('../validators/auth')
const router = Router()

router
  .post('/register', validatorCreateItem, authcontroller.registerUsers)
  .post('/login', validatorLogin, authcontroller.loginUsers)
  .post('/:id', authMiddleware(), validatorLogout, authcontroller.logoutUser)
  .post('/', validatorForgotPassword, authcontroller.forgotPassword)
  .patch('/resetPassword/:token', authcontroller.resetPassword)

module.exports = router

