require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const morganBody = require('morgan-body')

const { dbConnectMySQL } = require('./config/mysql')

const loggerStream = require('./utils/handleLogger')

const app = express()

// Configuración de CORS
const corsOptions = {
  // origin: 'https://your-trusted-domain.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}

app.use(cors(corsOptions))

// Configuración de Helmet
app.use(helmet())

// Limitación de tasa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 solicitudes por ventana
  message: 'Too many requests, please try again later.'
})

app.use(limiter)

// Middleware para validar el origen de las solicitudes
// app.use((req, res, next) => {
//   const allowedOrigins = ['https://your-trusted-domain.com']
//   const origin = req.headers.origin

//   if (allowedOrigins.includes(origin)) {
//     next()
//   } else {
//     res.status(403).json({ message: 'Forbidden' })
//   }
// })

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
  res.send('<h1>Hello world!</h1>')
})

console.clear()

app.listen(port, () => {
  console.log(`Aplicación corriendo en http://localhost:${port}`)
})

const ENGINE_DB = process.env.ENGINE_DB

if (ENGINE_DB === 'mysql') {
  dbConnectMySQL()
}
