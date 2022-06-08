'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Trips',
      [
        {
          user: 1,
          source: "Muhanga",
          destination: "Kigali",
          DateOfTravel: "2022-06-08 07:22:08.305 +00:00",
          DateOfDestination: "2022-06-19 07:22:08.305 +00:00",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user: 1,
          source: "Kigali",
          destination: "Ruhango",
          DateOfTravel: "2022-06-08 07:22:08.305 +00:00",
          DateOfDestination: "2022-06-19 07:22:08.305 +00:00",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
     
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
