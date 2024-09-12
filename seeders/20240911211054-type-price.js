'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TypePrices', [
      {
        id: uuidv4(), // Genera un UUID para cada registro
        name: 'Precio Publico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(), // Genera un UUID para cada registro
        name: 'Precio con Descuento',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TypePrices', null, {})
  }
}
