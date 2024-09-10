const { User, Rol } = require('../models')
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign, tokenResetPassword/*, verifyTokenResetPassword */ } = require('../utils/handleJwt')
const { handleHttpError } = require('../utils/handleError')
const sendMail = require('../email/email')
const ejs = require('ejs')
const path = require('path')

const registerUser = async function (body) {
  try {
    if (body.password !== body.verifyPassword) {
      throw new Error('Las contraseñas no coinciden')
    }

    const rol = await Rol.findOne({
      where: { name: 'Comercial' }
    })

    if (!rol) {
      throw new Error('El rol proporcionado no existe')
    }

    const encryptedPassword = await encrypt(body.password)

    const newUser = await User.create({
      fullName: body.fullName,
      email: body.email,
      password: encryptedPassword,
      idRol: rol.id,
      active: true
    })

    const token = await tokenSign(newUser)
    await newUser.update({ jwt: token })
    const userWithoutPassword = newUser.toJSON()
    delete userWithoutPassword.password
    delete userWithoutPassword.jwt
    delete userWithoutPassword.active
    delete userWithoutPassword.failedAttempts

    return { userWithoutPassword, token }
  } catch (error) {
    throw new Error(`Error al crear el user: ${error.message}`)
  }
}

const loginUser = async function (res, body) {
  try {
    const { password, email } = body

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'password', 'fullName', 'idRol', 'email', 'jwt', 'active', 'failedAttempts']
    })

    if (!user) return handleHttpError(res, 'Correo o contraseña incorrectos', 401)

    if (!user.active) return handleHttpError(res, 'Usuario desactivado. Contacte al administrador.', 403)

    const check = await compare(password, user.password)
    if (!check) {
      user.failedAttempts += 1
      await user.save()

      if (user.failedAttempts >= 3) {
        user.active = false
        await user.save()
        return handleHttpError(res, 'Usuario desactivado. Contacte al administrador.', 403)
      }

      return handleHttpError(res, 'Correo o contraseña incorrectos', 401)
    }

    user.failedAttempts = 0
    await user.save()

    const token = await tokenSign(user)
    await user.update({ jwt: token })

    const userWithoutSensitiveData = user.toJSON()
    delete userWithoutSensitiveData.password
    delete userWithoutSensitiveData.jwt
    delete userWithoutSensitiveData.failedAttempts

    return {
      token,
      user: userWithoutSensitiveData
    }
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error.message}`)
  }
}

const logoutUser = async function (userId) {
  try {
    const user = await User.findByPk(userId.id)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    await user.update({ jwt: null })

    return { message: 'Sesión cerrada correctamente' }
  } catch (error) {
    throw new Error(`Error al cerrar sesión: ${error.message}`)
  }
}

const forgotPassword = async function (email) {
  try {
    const user = await User.findOne({
      where: { email: email.email }
    })

    if (!user) {
      throw new Error('El email proporcionado no existe')
    }

    const token = await tokenResetPassword(user)
    const resetUrl = `http://localhost:3310/api/resetPassword/${token}`

    const htmlTemplate = await ejs.renderFile(
      path.join(__dirname, '../email/templates/password.ejs'),
      { fullName: user.fullName, resetUrl }
    )

    await sendMail(user.email, 'Restablecimiento de Contraseña', htmlTemplate)

    return { message: 'Correo de restablecimiento de contraseña enviado correctamente' }
  } catch (error) {
    console.log(error)
    throw new Error('Error al enviar el email')
  }
}

const resetPassword = async function (token) {

}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword
}
