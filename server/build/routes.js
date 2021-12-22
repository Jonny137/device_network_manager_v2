"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import userRoutes from './api/user/user.routes';
const device_routes_1 = __importDefault(require("./api/device/device.routes"));
// import conferenceRoutes from './api/conference/conference.routes';
// import bookingRoutes from './api/booking/booking.routes';
exports.default = (app) => {
    app
        // .use('/user', userRoutes)
        .use('/device', device_routes_1.default);
    // .use('/conference', conferenceRoutes)
    // .use('/booking', bookingRoutes);
};
