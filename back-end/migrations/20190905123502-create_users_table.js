// 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING(35),
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING(35),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(35),
        allowNull: false
      },
      mobilenumber: {
        type: Sequelize.STRING(35),
        allowNull: true
      },
      dateofbirth: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING(35),
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
