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
            dateStart: {
                allowNull: false,
                type: Sequelize.DATE
            },
            dateEnd: {
                allowNull: false,
                type: Sequelize.DATE
            },
            days: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            transportPrice: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            status: {
                allowNull: true,
                type: Sequelize.STRING
            },
            coordinatorId: {
                allowNull: true,
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            designerId: {
                allowNull: true,
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            logisticId: {
                allowNull: true,
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            personName: {
                allowNull: true,
                type: Sequelize.STRING
            },
            personPhone: {
                allowNull: true,
                type: Sequelize.STRING
            },
            eventImage: {
                allowNull: true,
                type: Sequelize.STRING
            },
            eventDescription: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            location: {
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
        await queryInterface.dropTable('Events');
    }
};

