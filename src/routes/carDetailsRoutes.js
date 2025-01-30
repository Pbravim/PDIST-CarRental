import express from 'express';
import CarDetailsController from '../controllers/carDetailsController.js';

const router = express.Router();
const carDetailsController = new CarDetailsController();

router.get('/', (req, res) => carDetailsController.findAll(req, res));
router.get('/:id', (req, res) => carDetailsController.findById(req, res));

// router.post('/', carDetailsController.create);
// router.put('/:id', carDetailsController.update);
// router.delete('/:id', carDetailsController.delete);

export default router;
