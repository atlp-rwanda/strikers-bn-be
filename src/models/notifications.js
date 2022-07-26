'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notifications.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV$
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
      type: DataTypes.STRING,
      allowNull: false
    },
    notifiedAt:{
      type: Datatypes.DATE,
      defaultValue: Date.now()
    },
    isRead:{
      type: Datatypes.BOOLEAN,
      default: false
    }
  }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
}