import UserRepository from "../repositories/userRepository.js";

export default class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAllUsers(options = {}) {
        return await this.userRepository.findAll(options);
    }

    async getUserById(id) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async createUser(userData) {
        return await this.userRepository.create(userData);
    }

    // Atualizar um usuário existente
    async updateUser(id, userData) {
        const userExists = await this.getUserById(id);
        if (!userExists) {
            throw new Error("Usuário não encontrado!");
        }
        await this.userRepository.update(id, userData);
        return await this.getUserById(id);
    }

    async deleteUser(id) {
        const userExists = await this.getUserById(id);
        if (!userExists) {
            throw new Error("Usuário não encontrado!");
        }
        return await this.userRepository.delete(id);
    }
}
