'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class TripRequestComments extends Model {
     static associate(models){
      TripRequestComments.belongsTo(models.TripRequest,{
          foreignKey:'tripId',
          as:'trip',
          onDelete:'CASCADE'
      });
  }
  toJSON(){
      return{...this.get(),id:undefined}
  }
  }
  TripRequestComments.init({
  userId:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.INTEGER,
      allowNull: false
  },
  tripId:{
      type: DataTypes.INTEGER,
      allowNull: false
  },
  comment:{
      type: DataTypes.STRING,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'TripRequestComments',
  });
  return TripRequestComments;
};