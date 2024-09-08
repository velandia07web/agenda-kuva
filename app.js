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
// Configurar la política de seguridad de contenido (CSP)
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:'],
    fontSrc: ["'self'"],
    connectSrc: ["'self'"],
    frameSrc: ["'self'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
    blockAllMixedContent: []
  }
}))

// Configurar el encabezado DNS Prefetch Control
app.use(helmet.dnsPrefetchControl({ allow: false }))

// Configurar el encabezado X-Frame-Options
app.use(helmet.frameguard({ action: 'deny' }))

// Eliminar el encabezado X-Powered-By
app.use(helmet.hidePoweredBy())

// Configurar el encabezado Strict-Transport-Security (HSTS)
app.use(helmet.hsts({
  maxAge: 31536000, // 1 año
  includeSubDomains: true,
  preload: true
}))

// Configurar el encabezado X-Download-Options
app.use(helmet.ieNoOpen())

// Configurar el encabezado X-Content-Type-Options
app.use(helmet.noSniff())

// Configurar el encabezado X-Permitted-Cross-Domain-Policies
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }))

// Configurar el encabezado Referrer-Policy
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }))

// Configurar el encabezado X-XSS-Protection
app.use(helmet.xssFilter())

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

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  },
  limit: '200mb'
}))

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
