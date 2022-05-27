'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email:"johndoe@gmail.com",
      phoneNumber:"+250787835467",
      createdAt:new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Sara',
      lastName: 'M',
      email:"mugisha@gmail.com",
      phoneNumber:"+250787549875",
      createdAt:new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Sando',
      lastName: 'Dush',
      email:"sanra@gmail.com",
      phoneNumber:"+250784935467",
      createdAt:new Date(),
      updatedAt: new Date()
      }], {
      });
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
