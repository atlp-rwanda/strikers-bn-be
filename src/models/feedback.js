'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {}
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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: 'Accommodation'
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