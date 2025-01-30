'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('car_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      class: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      city_mpg: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      combination_mpg: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      cylinders: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      displacement: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      drive: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      fuel_type: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      highway_mpg: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      make: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      transmission: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('car_details');
  },
};
