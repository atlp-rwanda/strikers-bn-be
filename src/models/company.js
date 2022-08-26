const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init(
    {
      companyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      managerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      dateRegistered: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};