"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDevice = exports.updateDeviceInfoForUser = exports.getDeviceByName = exports.addNewDevice = exports.getAllDevicesForUser = void 0;
const logger_1 = __importDefault(require("../../services/logger"));
const device_service_1 = __importDefault(require("./device.service"));
const utils_1 = require("../../services/utils");
const http_error_1 = __importDefault(require("../../services/errors/http.error"));
const getAllDevicesForUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const devices = await device_service_1.default.getAllDevicesforUser(userId);
        (0, utils_1.sendResponse)(res, devices);
    }
    catch (error) {
        logger_1.default.error('Error during fetching all devices: ', error);
        next(new http_error_1.default());
    }
};
exports.getAllDevicesForUser = getAllDevicesForUser;
const addNewDevice = async (req, res, next) => {
    try {
        let deviceInfo = req.body;
        deviceInfo['user'] = req.userId;
        const newDevice = await device_service_1.default.addNewDevice(deviceInfo);
        (0, utils_1.sendResponse)(res, newDevice);
    }
    catch (error) {
        logger_1.default.error('Error during device addition: ', error);
        next(new http_error_1.default());
    }
};
exports.addNewDevice = addNewDevice;
const getDeviceByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        const userId = req.userId;
        const device = await device_service_1.default.getDeviceByName(name, userId);
        (0, utils_1.sendResponse)(res, device);
    }
    catch (error) {
        logger_1.default.error('Error during fetching device by name: ', error);
        next(new http_error_1.default());
    }
};
exports.getDeviceByName = getDeviceByName;
const updateDeviceInfoForUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const device = await device_service_1.default.updateDeviceInfoForUser(id, req.body, userId);
        (0, utils_1.sendResponse)(res, device);
    }
    catch (error) {
        logger_1.default.error('Error during device update: ', error);
        next(new http_error_1.default());
    }
};
exports.updateDeviceInfoForUser = updateDeviceInfoForUser;
const deleteDevice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const deletedDevice = await device_service_1.default.deleteDevice(id, userId);
        (0, utils_1.sendResponse)(res, deletedDevice);
    }
    catch (error) {
        logger_1.default.error('Error during device deletion: ', error);
        next(new http_error_1.default());
    }
};
exports.deleteDevice = deleteDevice;
