'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.hasMany(models.Habit, { foreignKey: 'userId', onDelete: 'CASCADE' });
        User.hasMany(models.Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
        User.hasMany(models.Reminder, { foreignKey: 'userId', onDelete: 'CASCADE' });
        User.hasMany(models.Mood_Entry, { foreignKey: 'userId', onDelete: 'CASCADE' });
        User.hasMany(models.Focus_Session, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};