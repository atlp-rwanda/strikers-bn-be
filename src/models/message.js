'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.ChatRoom,{
        foreignKey:'chatRoomId',
        as:'chatRoom',
        onDelete:'CASCADE'
      }) 
    }
  }
  Message.init({
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
    chatRoomId: {
      type:DataTypes.INTEGER,
      allowNull: false,      
    }, 
    message: {
      type:DataTypes.STRING,
      allowNull: false
      }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};