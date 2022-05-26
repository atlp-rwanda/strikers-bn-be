// @ts-nocheck
"use strict";
import Sequelize, { Model } from "sequelize";
import Joi from "joi";
import jwt from "jsonwebtoken";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

export async function Role(sequelize, DataTypes) {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      role_id: Sequelize.BIGINT,
      role: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
}
