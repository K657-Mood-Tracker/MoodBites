'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Rename column
    await queryInterface.renameColumn('Journal_Entries', 'moodEntryId', 'moodTypeId');
    // Drop old foreign key
    await queryInterface.removeConstraint('Journal_Entries', 'Journal_Entries_moodEntryId_fkey');
    // Add new foreign key
    await queryInterface.addConstraint('Journal_Entries', {
      fields: ['moodTypeId'],
      type: 'foreign key',
      name: 'Journal_Entries_moodTypeId_fkey',
      references: {
        table: 'Mood_Types',
        field: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverse the changes
    await queryInterface.removeConstraint('Journal_Entries', 'Journal_Entries_moodTypeId_fkey');
    await queryInterface.addConstraint('Journal_Entries', {
      fields: ['moodTypeId'],
      type: 'foreign key',
      name: 'Journal_Entries_moodEntryId_fkey',
      references: {
        table: 'Mood_Entries',
        field: 'id'
      },
      onDelete: 'CASCADE'
    });
    await queryInterface.renameColumn('Journal_Entries', 'moodTypeId', 'moodEntryId');
  }
};
