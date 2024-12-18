'use strict';
const { v4: uuidv4 } = require('uuid'); // Importa la función para generar UUID

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PaymentsDates', [
      {
        id: uuidv4(),
        numberDays: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        numberDays: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        numberDays: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('PaymentsDates', null, {});
  }
};
