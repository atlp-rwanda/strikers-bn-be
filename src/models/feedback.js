'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.Accommodation, {
        foreignKey: 'accomodationId',
        as: 'accomodation',
        onDelete: 'CASCADE',
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Feedback.init({

    feedbackId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    accomodationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};