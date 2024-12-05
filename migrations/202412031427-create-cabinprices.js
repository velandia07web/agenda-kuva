'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CabinPrices', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            idCabin: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Cabins',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            typeEvent: {
                allowNull: false,
                type: Sequelize.ENUM('social', 'business')
            },
            pricePerHour: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            priceInit: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            deadHourPrice: {
                allowNull: false,
                type: Sequelize.FLOAT
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
        await queryInterface.dropTable('CabinPrices');
    }
};
