'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Rols', [
      {
        description: 'Superadministrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Comercial',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Contable',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Coordinador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Diseñador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Logistico',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Rols', null, {})
  }
}
