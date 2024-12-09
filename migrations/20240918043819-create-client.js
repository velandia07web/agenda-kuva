'use strict'
const {sequelize} = require("../config/mysql");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
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
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CC: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      idTypeClient: {
        type: Sequelize.UUID,
        references: {
          model: 'TypeClients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      company: {
        allowNull: true,
        type: Sequelize.STRING
      },
      celphone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      charge: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idUser: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      idSocialMedia: {
        type: Sequelize.UUID,
        references: {
          model: 'SocialMedias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      cupoDisponible: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      cupoCopado: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Clients')
  }
}
