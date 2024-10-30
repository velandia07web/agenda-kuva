'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Zones', 'idCompany', {
      type: Sequelize.UUID,
      references: {
        model: 'Companies', // Asegúrate de que este sea el nombre correcto de tu tabla
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Zones', 'idCompany')
  }
}
