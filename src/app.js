import express from 'express';
import cors from 'cors';
import carDetailsRouter from './routes/carDetailsRoutes.js'
import userRouter from './routes/userRouter.js'

const whiteList = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://127.0.0.1:3050",
  "http://localhost:3050",
  "http://127.0.0.1:3051",
  "http://localhost:3051",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (requestOrigin, callback) {
    if (!requestOrigin || whiteList.includes(requestOrigin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", requestOrigin);
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
};


class App {
    constructor() {
        this.app = express();
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors(corsOptions));
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