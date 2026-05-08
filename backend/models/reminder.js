'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reminder.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  Reminder.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    time: { type: DataTypes.DATE, allowNull: false },
    days: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false, defaultValue: [] },
    enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    sequelize,
    modelName: 'Reminder',
  });
  return Reminder;
};