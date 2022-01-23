"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./api/user/user.routes"));
const device_routes_1 = __importDefault(require("./api/device/device.routes"));
exports.default = (app) => {
    app
        .use('/user', user_routes_1.default)
        .use('/device', device_routes_1.default);
};
