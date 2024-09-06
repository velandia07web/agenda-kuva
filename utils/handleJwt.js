const { sign, verify } = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (user) => sign(
  {
    role: user.rolId,
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

module.exports = { tokenSign, verifyToken }
