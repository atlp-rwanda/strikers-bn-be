// @ts-nocheck
"use strict";

import { Model } from "sequelize";

// Joi.objectId = JoiObjectId(Joi);

export async function Role(sequelize, DataTypes) {
  class Role extends Model {
    static associate(models) {
    }
    toJSON() {
      return { ...this.get(), roleId: undefined, role: undefined };
    }
  }
  Role.init(
    {
      roleId: {
        type: DataTypes.UUIDV4,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
}
