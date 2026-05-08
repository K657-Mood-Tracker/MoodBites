'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mood_Types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moodEntryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Mood_Entries',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      label: {
        type: Sequelize.STRING
      },
      hex: {
        type: Sequelize.STRING
      },
      icon_path: {
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
    await queryInterface.dropTable('Mood_Types');
  }
};