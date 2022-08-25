'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bookings', 'startDate', {
      type: Sequelize.DATE,
      defaultValue: Date.now()
    });
    await queryInterface.addColumn('Bookings', 'endDate', {
      type: Sequelize.DATE,
      defaultValue: Date.now()
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};