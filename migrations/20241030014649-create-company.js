'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      legalName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      website: {
        allowNull: true,
        type: Sequelize.STRING
      },
      industry: {
        allowNull: true,
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.UUID,
        references: {
          model: 'Clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      idTypeDocument: {
        type: Sequelize.UUID,
        references: {
          model: 'TypeDocuments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      numberDocument: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      cupo: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      typePayment:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      idPaymentsDate: {
        type: Sequelize.UUID,
        allowNull: true
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};