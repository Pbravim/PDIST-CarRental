import db from "../../sequelize/models/index.js";

export default class CarDetailsRepository {
    
    async findAll(options) {
        return await db.CarDetails.findAll(options);
    }

    async findOne(options) {
        return await db.CarDetails.findOne(options);
    }
}

