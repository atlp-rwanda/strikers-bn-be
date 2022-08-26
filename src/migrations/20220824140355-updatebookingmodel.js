'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Bookings', 'startDate', {
      type: Sequelize.DATE,
      defaultValue: Date.now()
    });
    await queryInterface.changeColumn('Bookings', 'endDate', {
      type: Sequelize.DATE,
      defaultValue: Date.now()
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings')
  }
};