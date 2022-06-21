/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {}

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Roles.init({
    roleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    roleTitle: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};
