'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Events', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            cityId: {
                allowNull: false,
                type: Sequelize.UUID
            },
            dateEvent: {
                allowNull: false,
                type: Sequelize.DATE
            },
            total: {
                allowNull: false,
                type: Sequelize.FLOAT
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
            date_Init: {
                allowNull: false,
                type: Sequelize.DATE
            },
            date_finish: {
                allowNull: false,
                type: Sequelize.DATE
            },
            days: {
                allowNull: false,
                type: Sequelize.INTEGER
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
    }
};

