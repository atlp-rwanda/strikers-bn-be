<<<<<<< HEAD
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
=======
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
>>>>>>> 8b843b6e9244c9d5a9340eac9688532ffbb63efb
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookingId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      supplierId: {
<<<<<<< HEAD
        type: Sequelize.UUID,
=======
        type: Sequelize.INTEGER,
>>>>>>> 8b843b6e9244c9d5a9340eac9688532ffbb63efb
        allowNull: false,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
      },
      requesterId: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
<<<<<<< HEAD
        defaultValue: 'pending',
      },
      dateSubmitted: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
=======
        defaultValue: "pending",
      },
      dateSubmitted: {
        type: Sequelize.DATE,
>>>>>>> 8b843b6e9244c9d5a9340eac9688532ffbb63efb
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
<<<<<<< HEAD
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
=======
        type: Sequelize.DATE,
>>>>>>> 8b843b6e9244c9d5a9340eac9688532ffbb63efb
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.dropTable('Bookings');
=======
    await queryInterface.dropTable("Bookings");
>>>>>>> 8b843b6e9244c9d5a9340eac9688532ffbb63efb
  },
};
