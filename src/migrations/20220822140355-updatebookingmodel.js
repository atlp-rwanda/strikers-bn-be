'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bookings', 'startDate', {
      type: Sequelize.DATE,
      defaultValue: Date.now(),
      allowNull: false,
    });
    await queryInterface.addColumn('Bookings', 'endDate', {
      type: Sequelize.DATE,
      defaultValue: Date.now(),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};