'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Rols', [
      {
        name: 'Superadministrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Comercial',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Contable',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coordinador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Diseñador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Logistico',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Rols', null, {})
  }
}
