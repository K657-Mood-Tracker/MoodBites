'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habit_Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Habit_Entry.belongsTo(models.Habit, { foreignKey: 'habitId', onDelete: 'CASCADE' });
    }
  }
  Habit_Entry.init({
    date: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM('completed', 'skipped'),
      defaultValue: 'skipped',
      allowNull: false
    },
    habitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Habits',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Habit_Entry',
  });
  return Habit_Entry;
};