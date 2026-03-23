'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Habit.hasMany(models.Habit_Entry, { foreignKey: 'habitId', onDelete: 'CASCADE' });
      Habit.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  Habit.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Habit',
  });
  return Habit;
};