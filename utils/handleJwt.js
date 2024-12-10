const { sign, verify } = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EMAIL = process.env.JWT_EMAIL
const tokenSign = async (user) => sign(
  {
    role: user.idRol,
    email: user.email
  },
  JWT_SECRET,
  { expiresIn: '4h' }
)

const verifyToken = async (token) => {
  try {
    return verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

const tokenResetPassword = async (user) => sign(
  {
    email: user.email
  },
  JWT_EMAIL,
  { expiresIn: '10m' }
)

const verifyTokenResetPassword = async (token) => {
  try {
    return verify(token, JWT_EMAIL)
  } catch (error) {
    return null
  }
}

// const decodeJWT = async (token) => {
//   try {
//     return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
//   } catch (error) {
//     console.error('Erro en la decodificación del toke', error)
//     throw new Error('Error en la decodificación del toke')
//   }
// }

module.exports = { tokenSign, verifyToken, tokenResetPassword, verifyTokenResetPassword }
