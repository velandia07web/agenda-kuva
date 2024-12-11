'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductPrices', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            product_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            hour: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            idZone: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Zones',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            priceDeadHour: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            type_price_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'TypePrices',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductPrices');
    },
};
