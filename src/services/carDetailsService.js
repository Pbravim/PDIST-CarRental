import CarDetailsRepository from "../repositories/carDetailsRepository.js";


export default class CarDetailsService {
    constructor() {
        this.carDetailsRepository = new CarDetailsRepository();
    }

    async findAll(options) {
        return await this.carDetailsRepository.findAll(options);
    }

    async findById(id, options = {}) {
        options.where = { ...(options.where || {}), id };

        return await this.  carDetailsRepository.findOne(options);
    }
}