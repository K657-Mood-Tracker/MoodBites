'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mood_Types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Mood_Types.belongsTo(models.Mood_Entry, { foreignKey: 'moodEntryId', onDelete: 'CASCADE' });
        Mood_Types.hasOne(models.Journal_Entry, { foreignKey: 'moodTypeId', onDelete: 'CASCADE' });
    }
  }
  Mood_Types.init({
    moodEntryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Mood_Entries',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    label: DataTypes.STRING,
    hex: DataTypes.STRING,
    icon_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mood_Types',
  });
  return Mood_Types;
};