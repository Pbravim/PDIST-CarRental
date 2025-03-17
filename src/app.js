import express from 'express';
import carDetailsRouter from './routes/carDetailsRoutes.js'
import userRouter from './routes/userRouter.js'
import cors from 'cors';
import './messageria/messageriaConsumer.js';

class App {
    constructor() {
        this.app = express();
        this.middlewares()
        this.routes()
        this.errorHandler();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

    }

    routes() {
        this.app.use("/users", userRouter);
        this.app.use("/car-details", carDetailsRouter);
    }

    errorHandler() {
        this.app.use((err, req, res, next) => {
            res.status(500).json({ message: err.message });
        });
    }

    start(port){
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

export default new App();