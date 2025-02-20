import db from "../../sequelize/models/index.js";

export default class CarDetailsRepository {
  async findAll(options) {
    if (!options.attributes) {
      options.attributes = { include: ["available"] };
    }
    return await db.CarDetails.findAll(options);
  }

  async findOne(options) {
    if (!options.attributes) {
      options.attributes = { include: ["available"] };
    }
    return await db.CarDetails.findOne(options);
  }
}
