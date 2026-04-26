'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = 'Reminders';
    const columnExists = await queryInterface.sequelize.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}' AND column_name = 'repeat'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (columnExists.length > 0) {
      await queryInterface.renameColumn(tableName, 'repeat', 'days');
    }
  },

  async down(queryInterface, Sequelize) {
    const tableName = 'Reminders';
    const columnExists = await queryInterface.sequelize.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}' AND column_name = 'days'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (columnExists.length > 0) {
      await queryInterface.renameColumn(tableName, 'days', 'repeat');
    }
  }
};
