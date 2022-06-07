"use strict";
import { Sequelize, Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {}
    toJSON() {
      return { ...this.get(), roleid: undefined, roletitle: undefined };
    }
  }
  Role.init(
    {
      roleid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      roletitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdat: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedat: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "roles",
    }
  );
  return Role;
};
