'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatRoom.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },  
    userId:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.INTEGER,
      allowNull: false
    },
    name:  {
      type:DataTypes.STRING,
      defaultValue:"general",
      allowNull: false
      }
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};