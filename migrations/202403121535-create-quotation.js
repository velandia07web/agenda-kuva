'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Quotations', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            state: {
                allowNull: false,
                type: Sequelize.STRING
            },
            correlativo: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            reference: {
                allowNull: false,
                type: Sequelize.STRING
            },
            clientId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Clients',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            eventDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            cityId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Cities',
                    key: 'id'
                },
                onUpdate: 'CASCADE'
            },
            eventType: {
                allowNull: false,
                type: Sequelize.ENUM('social', 'business')
            },
            subtotal: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            discount: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            IVA: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            totalNet: {
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
        await queryInterface.dropTable('Quotations');
    }
};