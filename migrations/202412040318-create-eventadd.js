'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('EventAdd', {
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
            addId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Adds',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 1 // Valor predeterminado en caso de no ser especificado
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
        await queryInterface.dropTable('EventAdd');
    }
};

