'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccommodationLikes extends Model {
    static associate(models) {}
  }
  AccommodationLikes.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    accommodationId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    likedBy: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'AccommodationLikes',
  });
  return AccommodationLikes;
};