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
            idQuotation: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Quotations',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            idPaymentsDate: {
                allowNull: true,
                type: Sequelize.UUID,
                //references: {model: 'PaymentsDates',key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            arrearsDays: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            timelyPaymentDate: {
                allowNull: true,
                type: Sequelize.DATE
            },
            idPass: {
                allowNull: true,
                type: Sequelize.UUID,
                //references: {model: 'Passes',key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            pendingPayment: {
                allowNull: true,
                type: Sequelize.FLOAT
            },
            idInvoice: {
                allowNull: true,
                type: Sequelize.UUID,
                //references: {model: 'Invoices',key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            dateInvoice: {
                allowNull: true,
                type: Sequelize.DATE
            },
            state: {
                allowNull: true,
                type: Sequelize.STRING
            },
            etapa: {
                allowNull: true,
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
