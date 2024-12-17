'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      cedula: {
        allowNull: false,
        type: Sequelize.BIGINT,
        unique: true
      },
      phone: {
        allowNull: false,
        type: Sequelize.BIGINT,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jwt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      failedAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idRol: {
        type: Sequelize.UUID,
        references: {
          model: 'Rols',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      idZone: {
        type: Sequelize.UUID,
        references: {
          model: 'Zones',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('Users')
  }
}
