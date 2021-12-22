import { Application } from 'express';
import userRoutes from './api/user/user.routes';
import deviceRoutes from './api/device/device.routes';

export default (app: Application): void => {
    app
        .use('/user', userRoutes)
        .use('/device', deviceRoutes)
};
