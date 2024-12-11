'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PricePacks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idPack: {
        type: Sequelize.UUID,
        allowNull: false,
        //references: {model: 'Packs', key: 'id',},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      idProduct: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {model: 'Products', key: 'id',},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      priceDeadHour: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PricePacks');
  },
};
