import express from 'express';
import CarDetailsController from '../controllers/carDetailsController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
const carDetailsController = new CarDetailsController();

router.get('/', authenticate, (req, res) => carDetailsController.findAll(req, res));
router.get('/:id', authenticate, (req, res) => carDetailsController.findById(req, res));

// router.post('/', carDetailsController.create);
// router.put('/:id', carDetailsController.update);
// router.delete('/:id', carDetailsController.delete);

export default router;
