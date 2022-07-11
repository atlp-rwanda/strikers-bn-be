module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passwordResetToken: {
        type: Sequelize.STRING(2500),
        allowNull: true
      },
      birthdate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferredLanguage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferredCurrency: {
        type: Sequelize.STRING,
        allowNull: true
      },
      department: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lineManager: {
        type: Sequelize.STRING,
        allowNull: true
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verificationToken: {
        type: Sequelize.STRING(2500),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};