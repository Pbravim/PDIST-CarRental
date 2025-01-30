import db from "../../sequelize/models/index.js";

export default class UserRepository {
    
    async findAll(options) {
        return await db.User.findAll(options);
    }

    async findOne(options) {
        return await db.User.findOne(options);
    }

    async create(userData) {
        return await db.User.create(userData);
    }

    async update(id, userData) {
        return await db.User.update(userData, {
            where: { id }
        });
    }

    async delete(id) {
        return await db.User.destroy({
            where: { id }
        });
    }
}
