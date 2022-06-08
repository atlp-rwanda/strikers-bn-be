"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      uuid: {
        type: Sequelize.UUID,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      roleid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: Sequelize.STRING(2500),
        allowNull: true,
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // await queryInterface.createTable("roles", {
    //   roleid: {
    //     type: Sequelize.UUID,
    //     primaryKey: true,
    //   },
    //   roletitle: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
  async downRoles(queryInterface, Sequelize) {
    await queryInterface.dropTable("roles");
  },
};
