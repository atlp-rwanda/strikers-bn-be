module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accommodation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rooms: [
        {
          id: { type: Sequelize.INTEGER, autoIncrement: true },
          bedType: { type: Sequelize.STRING, allowNull: false },
          cost: { type: Sequelize.STRING, allowNull: false },
        },
      ],
      pictures: [
        {
          picture: { type: Sequelize.STRING, allowNull: false },
          CloudinaryId: { type: Sequelize.STRING, allowNull: false },
        }
      ],

      geoLocation: [
        {
          latitude: { type: Sequelize.STRING, allowNull: false },
          longitude: { type: Sequelize.STRING, allowNull: false }
        }
      ],

      highlights: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ammenities: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accommodation');
  }
};
