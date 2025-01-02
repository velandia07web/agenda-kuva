'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('EventUsers', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            eventId: {
                type: Sequelize.UUID,
                allowNull: false,
                //references: {model: 'Events',key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                //references: {model: 'Users',key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'employee'
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
        await queryInterface.dropTable('EventUsers');
    }
};