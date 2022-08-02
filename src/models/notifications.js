'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init(
    {
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false
      },
      title: {
        type: DataTypes.STRING,
        allowNull:false
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false
      },
      to:{
        type: DataTypes.UUID,
        allowNull: false
      },
      notifiedAt:{
        type: DataTypes.DATE,
        defaultValue: Date.now()
      },
      isRead:{
        type: DataTypes.BOOLEAN,
        default: false
      }
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};