'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const roles = await queryInterface.sequelize.query(
      "SELECT id, name FROM `Rols`;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const companies = [
      {
        id: uuidv4(),
        name: 'Kuva',
        legalName: 'Kuva',
        email: 'contact@kuva.com',
        phone: '+571234567890',
        address: 'Calle 123 #45-67, Bogotá, Colombia',
        website: 'https://www.kuva.com',
        industry: 'Technology',
        clientId: null,
        idTypeDocument: 1,
        numberDocument: 838238,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Companies', companies, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Companies', null, {
      where: {
        email: 'contact@kuva.com',
      },
    });
  },
};
