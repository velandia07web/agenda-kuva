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
            reference: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            clientId: {
                allowNull: false,
                type: Sequelize.UUID
            },
            typePricesId: {
                allowNull: false,
                type: Sequelize.UUID
            },
            telephone: {
                allowNull: false,
                type: Sequelize.STRING
            },
            SocialMediasId: {
                allowNull: false,
                type: Sequelize.UUID
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID
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
            state:{
                allowNull: false,
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Events');
        await queryInterface.dropTable('Quotations');
    }
};