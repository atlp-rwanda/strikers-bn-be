<<<<<<< HEAD
import { Model } from "sequelize";

=======
"use strict";
const { Model } = require("sequelize");
>>>>>>> 5bdf4cdfc943e51ac5dae2a06b6e3152e474c81a
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
<<<<<<< HEAD
      user: DataTypes.STRING,
      source: DataTypes.STRING,
      destination: DataTypes.STRING,
      DateOfTravel: DataTypes.DATE,
      DateOfDestination: DataTypes.DATE,
=======
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DateOfTravel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DateOfDestination: {
        type: DataTypes.DATE,

        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
>>>>>>> 5bdf4cdfc943e51ac5dae2a06b6e3152e474c81a
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};
