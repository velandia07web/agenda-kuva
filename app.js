require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const csurf = require('csurf')

const morganBody = require('morgan-body')

const { dbConnectMySQL } = require('./config/mysql')

const loggerStream = require('./utils/handleLogger')

const app = express()
app.use(helmet())
app.use(csurf())
app.use(cors())
app.use(express.json())
app.use(express.static('storage'))

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400
  }
})

const port = process.env.PORT || 4000

app.use('/api', require('./routes'))

app.get('/', (req, res) => {
  res.send('<h1>¡Miau!</h1>')
})

console.clear()

app.listen(port, () => {
  console.log(`Aplicación corriendo en http://localhost:${port}`)
})

const ENGINE_DB = process.env.ENGINE_DB

if (ENGINE_DB === 'mysql') {
  dbConnectMySQL()
}
