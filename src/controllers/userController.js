import UserService from "../services/userService.js";

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const userData = req.body;

            const updatedUser = await this.userService.updateUser(id, userData);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            await this.userService.deleteUser(id);
            return res.status(204).send(); 
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
