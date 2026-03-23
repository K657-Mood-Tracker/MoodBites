'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mood_Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mood_Entry.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Mood_Entry.hasOne(models.Mood_Types, { foreignKey: 'moodEntryId', onDelete: 'CASCADE' });
      Mood_Entry.hasOne(models.Journal_Entry, { foreignKey: 'moodEntryId', onDelete: 'CASCADE' });
    }
  }
  Mood_Entry.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Mood_Entry',
  });
  return Mood_Entry;
};