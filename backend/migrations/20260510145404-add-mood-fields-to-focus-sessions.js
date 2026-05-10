'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Focus_Sessions', 'before_mood', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Focus_Sessions', 'after_mood', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Focus_Sessions', 'before_mood');
    await queryInterface.removeColumn('Focus_Sessions', 'after_mood');
  }
};
