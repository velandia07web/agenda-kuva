'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Sales', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            quotationId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Quotations',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            subtotal: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            totalWithIVA: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            IVA: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            totalNet: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            shippingCost: {
                allowNull: true,
                type: Sequelize.FLOAT
            },
            paymentMethod: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paymentTerm: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            debt: {
                allowNull: true,
                type: Sequelize.FLOAT
            },
            daysLate: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            paymentMade: {
                allowNull: true,
                type: Sequelize.FLOAT
            },
            bankAccountId: {
                allowNull: true,
                type: Sequelize.UUID
            },
            purchaseOrder: {
                allowNull: true,
                type: Sequelize.STRING
            },
            invoiceNumber: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
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
        await queryInterface.dropTable('Sales');
    }
};