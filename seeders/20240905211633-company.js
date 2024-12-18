"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const typeDocuments = [
      {
        id: uuidv4(),
        name: "Cedula",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Rut",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        name: "Nit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const date = await queryInterface.sequelize.query(
      'SELECT id FROM `PaymentsDates`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert("TypeDocuments", typeDocuments, {});

    const companies = [
      {
        id: uuidv4(),
        name: "Kuva",
        legalName: "Kuva",
        email: "contact@kuva.com",
        phone: "+571234567890",
        address: "Calle 123 #45-67, Bogotá, Colombia",
        website: "https://www.kuva.com",
        industry: "Technology",
        clientId: null,
        idTypeDocument: 1,
        numberDocument: 838238,
        cupo: 6000000,
        typePayment: "A CUOTAS",
        idPaymentsDate: date[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Companies", companies, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Companies", null, {
      where: {
        email: "contact@kuva.com",
      },
    });

    await queryInterface.bulkDelete("TypeDocuments", null, {});
  },
};

