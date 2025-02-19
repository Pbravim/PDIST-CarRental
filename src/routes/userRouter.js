import express from "express";
import UserController from "../controllers/userController.js";
import {authenticate} from "../middlewares/authenticate.js"

const router = express.Router();
const userController = new UserController();

router.get("/", (req, res) => userController.getAllUsers(req, res));  
router.get("/:id", authenticate, (req, res) => userController.getUserById(req, res));  
router.post("/register", (req, res) => userController.createUser(req, res));  
router.put("/:id", (req, res) => userController.updateUser(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

export default router;
