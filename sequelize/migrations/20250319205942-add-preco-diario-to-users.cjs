"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("car_details", "preco_diario", {
      type: Sequelize.FLOAT,  
      allowNull: false,        
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("car_details", "preco_diario");
  },
};
