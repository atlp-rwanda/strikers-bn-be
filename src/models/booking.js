const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      bookingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      supplierId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      accomodationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      requesterId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      startDate: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      endDate: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      dateSubmitted: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
