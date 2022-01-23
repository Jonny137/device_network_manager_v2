"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingDevices = void 0;
const ping_1 = __importDefault(require("ping"));
const device_service_1 = __importDefault(require("../api/device/device.service"));
const pingDevices = async () => {
    const devices = await device_service_1.default.getAllDevices();
    devices === null || devices === void 0 ? void 0 : devices.forEach(async (device) => {
        const res = await ping_1.default.promise.probe(device.host);
        if (res.alive) {
            await device_service_1.default.updateDeviceInfo(device.id, 'Connected', 0);
        }
        else {
            await device_service_1.default.updateDeviceInfo(device.id, 'Disconnected', device.disc_time + 60);
        }
    });
};
exports.pingDevices = pingDevices;
