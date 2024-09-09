/* const nodemailer = require('nodemailer')
const { mail } = require('../config/email')

const emailTransporter = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  tls: {
    rejectUnauthorized: false
  },
  secure: false,
  auth: {
    user: mail.user,
    pass: mail.pass
  }
})

const sendEmail = async (email, subject, html) => {
  await emailTransporter.sendMail({
    from: `MHCode <${mail.user}>`,
    to: email,
    subject,
    text: 'Hola amigos, suscríbance para más videos',
    html
  })
}

module.exports = {
  sendEmail
} */
const nodemailer = require('nodemailer')
// require('dotenv').config()

const sendEmail = async (option) => {
  // CREATE A TRANSPORTER
  const trasporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // DEFINE EMAIL OPTIONS
  const emailOptions = {
    from: 'Programing Cat<edwin.velasquez@umanizales.edu.co>',
    to: option.email,
    subject: option.subject,
    text: option.message
  }

  await trasporter.sendMail(emailOptions)
}

module.exports = sendEmail
