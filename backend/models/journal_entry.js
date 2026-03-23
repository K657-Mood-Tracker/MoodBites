'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal_Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Journal_Entry.belongsTo(models.Mood_Entry, { foreignKey: 'moodEntryId', onDelete: 'CASCADE' });
    }
  }
  Journal_Entry.init({
    moodEntryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Mood_Entries',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Journal_Entry',
  });
  return Journal_Entry;
};