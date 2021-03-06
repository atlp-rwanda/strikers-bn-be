module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
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
        type: Sequelize.UUID,
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
        defaultValue: 'pending',
      },
      dateSubmitted: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  },
};
