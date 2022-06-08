'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trip.init({
    
    user:{ 
      type: DataTypes.INTEGER,
         allowNull: false

    },
    source: {
      type: DataTypes.STRING,
         allowNull: false

    },
    destination: {
      type: DataTypes.STRING,
         allowNull: false

    },
    DateOfTravel: {
      type: DataTypes.STRING,
         allowNull: false

    },
    DateOfDestination: {
      type: DataTypes.DATE,

   allowNull: false   },
    status: {
      type: DataTypes.STRING,
         allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};