const { Sequelize } = require('sequelize')

const database = process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  logging: false
})

const dbConnectMySQL = async () => {
  try {
    await sequelize.authenticate()
    console.log('> Conexión establecida con la base de datos')
  } catch (error) {
    console.log(`> Error de conexión: ${error}`)
  }
}

module.exports = { sequelize, dbConnectMySQL }
