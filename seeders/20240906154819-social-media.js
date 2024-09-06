'use strict'
const { v4: uuidv4 } = require('uuid') // Importa la función para generar UUID

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SocialMedias', [
      {
        id: uuidv4(), // Genera un UUID para cada registro
        name: 'Whatsapp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Facebook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Instagram',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SocialMedias', null, {})
  }
}
