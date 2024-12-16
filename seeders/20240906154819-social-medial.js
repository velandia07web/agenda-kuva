'use strict'
const { v4: uuidv4 } = require('uuid') // Importa la función para generar UUID

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SocialMedias', [
      {
        id: uuidv4(), // Genera un UUID para cada registro
        name: 'Whatsapp',
        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Facebook',
        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Instagram',
        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SocialMedias', null, {})
  }
}
