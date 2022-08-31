/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here. this is to satisfy all models are on required elements.
      // define associtaion there or here.
    }

    toJSON() {
      return { ...this.get(), id: undefined, password: undefined };
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      defaultValue: 'c1f1d2bf-33bd-4e11-9d7a-0331db465f95',
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordResetToken: {
      type: DataTypes.STRING(2500),
      allowNull: true
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preferredLanguage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preferredCurrency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lineManager: {
      type: DataTypes.UUID,
      defaultValue: '13c35001-a96d-4307-b86a-5f9aef66f771',
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationToken: {
      type: DataTypes.STRING(2500),
      allowNull: true
    }
    ,
    profilePic: {
      type: DataTypes.STRING(2500),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.sync({ alter: true })
  return User;
};
