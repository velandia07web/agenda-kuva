const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const path = require('path')

const CLIENT_ID = process.env.EMAIL_CLIENT_ID
const CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET
const REDIRECT_URI = process.env.EMAIL_REDIRECT_URI
const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN
const EMAIL_USER = process.env.EMAIL_USER

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail (to, subject, htmlContent) {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    })

    const mailOptions = {
      from: `Kuva ${EMAIL_USER}`,
      to,
      subject,
      html: htmlContent,
      attachments: [{
        filename: 'logo.png',
        path: path.join(__dirname, '../email/img/logo.png'),
        cid: 'logoImage'
      }]
    }

    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    console.error('Error enviando correo:', error)
    throw new Error('Error enviando correo')
  }
}

module.exports = sendMail
