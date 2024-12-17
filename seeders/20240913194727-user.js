"use strict";
const { v4: uuidv4 } = require("uuid");
const { encrypt } = require("../utils/handlePassword");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = await queryInterface.sequelize.query(
      "SELECT id, name FROM `Rols`;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const zones = await queryInterface.sequelize.query(
      "SELECT id, name FROM `Zones`;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const rol = {};
    roles.forEach((r) => {
      if (r.name === "Superadministrador") rol.superAdmin = r.id;
    });

    const zone = {};
    zones.forEach((z) => {
      if (z.name === "EJE CAFETERO") zone.eje = z.id;
    });

    const encryptedPassword = await encrypt("T@zmania12345678");

    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        name: "Jhonatan",
        lastName: "Velandia",
        email: "velandiajhonata07@gmail.com",
        cedula: 1111111111,
        phone: 3333333333,
        password: encryptedPassword,
        idRol: rol.superAdmin,
        idZone: zone.eje,
        active: true,
        failedAttempts: 0,
        state: 'ACTIVO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
