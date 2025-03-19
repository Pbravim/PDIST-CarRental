'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(__dirname);
    const filePath = path.join(__dirname, './car_data.json');
    const carData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const carsWithoutPrice = carData.map(({ price, daily_rental_price, ...car }) => ({
      ...car,
      preco_diario: daily_rental_price,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    console.log(carsWithoutPrice);
    

    return queryInterface.bulkInsert('car_details', carsWithoutPrice);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('car_details', null, {});
  }
};
