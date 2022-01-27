import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({});

import logger from './services/logger';
import connectDB from './services/db';
import swaggerRoutes from './swagger/index';
import routes from './routes';
import errorMiddleware from './middlewares/error.middleware';
import { startCron } from './services/cron';

const port: number = parseInt(process.env.PORT || '8080', 10);

const app: Application = express();

app.use(cors());
app.use(express.json());

connectDB();
routes(app);

app.use('/', swaggerRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
    startCron();
    logger.info(`Server is running on port ${port}`);
}
).on('error', (error: any) => {
    logger.error('FATAL ERROR:', error);
    process.exit(-1);
});
