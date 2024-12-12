'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('EventProduct', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            eventId: {
                allowNull: false,
                type: Sequelize.UUID,
                //references: {model: 'Events', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            productId: {
                allowNull: false,
                type: Sequelize.UUID,
                //references: {model: 'Products', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            hours: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 0
            },
            days: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 1
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
        await queryInterface.dropTable('EventProduct');
    }
};
