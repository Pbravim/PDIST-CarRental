import express from 'express';
import carDetailsRouter from './routes/carDetailsRoutes.js'
import userRouter from './routes/userRouter.js'
import cors from 'cors';


class App {
    constructor() {
        this.app = express();
        this.middlewares()
        this.routes()

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

    start(port){
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

export default new App();