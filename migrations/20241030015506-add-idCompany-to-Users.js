'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'idCompany', {
      type: Sequelize.UUID,
      references: {
        model: 'Companies', // Asegúrate de que este nombre coincida con el de la tabla
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'idCompany');
  }
};
