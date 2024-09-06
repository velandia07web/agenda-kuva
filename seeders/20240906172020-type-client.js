'use strict'
const { v4: uuidv4 } = require('uuid') // Importa la función para generar UUID

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TypeClients', [
      {
        id: uuidv4(), // Genera un UUID para cada registro
        name: 'Persona Natural',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(), // Genera un UUID para cada registro
        name: 'Empresa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TypeClients', null, {})
  }
}
