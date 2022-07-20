<<<<<<< HEAD
"use strict";
import { Model } from "sequelize";
=======
import {
  Model
} from 'sequelize';

>>>>>>> fc950d5a3b500a4b24feab29d5fa5118080f40ac
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
  Trip.init(
    {
      user: DataTypes.STRING,
      source: DataTypes.STRING,
      destination: DataTypes.STRING,
      DateOfTravel: DataTypes.DATE,
      DateOfDestination: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
