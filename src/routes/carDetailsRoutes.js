import express from "express";
import CarDetailsController from "../controllers/carDetailsController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();
const carDetailsController = new CarDetailsController();

router.get("/", (req, res) => carDetailsController.findAll(req, res));
router.get("/my-reservations", authenticate, (req, res) => carDetailsController.getMyReservations(req, res))
router.get("/:id", (req, res) => carDetailsController.findById(req, res));
router.patch("/rent/:id", authenticate, (req, res) => carDetailsController.rentCar(req, res));
router.patch("/cancel/:id", authenticate, (req, res) => carDetailsController.cancelReservation(req, res))
router.patch("/return/:id", authenticate, (req, res) => carDetailsController.returnCar(req, res));
router.get("/reserved-cars", (req, res) =>
  carDetailsController.getReservedCars(req, res)
);


// router.post('/', carDetailsController.create);
// router.put('/:id', carDetailsController.update);
// router.delete('/:id', carDetailsController.delete);

export default router;
