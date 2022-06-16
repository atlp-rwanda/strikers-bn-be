"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class TripRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TripRequest.init(
    {
      user: DataTypes.STRING,
      source: DataTypes.STRING,
      destination: DataTypes.STRING,
      DateOfTravel: DataTypes.DATE,
      DateOfDestination: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TripRequest",
    }
  );
  return TripRequest;
};
