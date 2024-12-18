'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Invoices', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            clientId: {
                allowNull: false,
                type: Sequelize.UUID,
                //references: {model: 'Clients',key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            invoiceNumber: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            totalAmount: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            issueDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            dueDate: {
                allowNull: true,
                type: Sequelize.DATE
            },
            paymentStatus: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'Pending'
            },
            notes: {
                allowNull: true,
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('Invoices');
    }
};
