'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log(__dirname);
    const filePath = path.join(__dirname, './car_data.json');
    const carData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const carsWithTimestamps = carData.map(car => ({
      ...car,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    console.log(carsWithTimestamps);
    
    return queryInterface.bulkInsert('car_details', carsWithTimestamps);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('car_details', null, {});
  }
};
