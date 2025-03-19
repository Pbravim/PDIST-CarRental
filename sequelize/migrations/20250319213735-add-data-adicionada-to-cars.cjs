"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("car_details", "data_inicio", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("car_details", "data_fim", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("car_details", "data_inicio");
    await queryInterface.removeColumn("car_details", "data_fim");

  },
};
