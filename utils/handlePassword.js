const bcrypt = require('bcryptjs')

const encrypt = async (passwordPlain) => {
  try {
    const hash = await bcrypt.hash(passwordPlain, 12)
    return hash
  } catch (error) {
    throw new Error('Error encrypting the password')
  }
}

const compare = async (passwordPlain, hashPassword) => {
  try {
    const match = await bcrypt.compare(passwordPlain, hashPassword)
    return match
  } catch (error) {
    throw new Error('Error comparing the passwords')
  }
}

module.exports = { encrypt, compare }
