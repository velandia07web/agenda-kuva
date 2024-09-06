'use strict'
const { v4: uuidv4 } = require('uuid') // Importa la función para generar UUID

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TypeDocuments', [
      {
        id: uuidv4(), // Genera un UUID para cada registro
        name: 'Cedula',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Rut',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Nit',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TypeDocuments', null, {})
  }
}
