'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const clients = await queryInterface.sequelize.query(
        'SELECT id FROM `Clients`;',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!clients.length) {
      throw new Error('No hay clientes en la tabla Clients.');
    }

    const clientId = clients[0].id;

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
