"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_model_1 = __importDefault(require("./device.model"));
const getAllDevices = async () => device_model_1.default.find({});
const getAllDevicesforUser = async (userId) => device_model_1.default.find({ user: userId }).populate('User');
const addNewDevice = async (device) => {
    const newDevice = new device_model_1.default(device);
    return newDevice.save();
};
const getDeviceByName = async (name, userId) => device_model_1.default.findOne({ name, user: userId });
const updateDeviceInfoForUser = async (id, device, userId) => device_model_1.default.findOneAndUpdate({ _id: id, user: userId }, device, { new: true });
const updateDeviceInfo = async (id, status, disc_time) => device_model_1.default.findOneAndUpdate({ _id: id }, { status, disc_time }, { new: true });
const deleteDevice = async (id, userId) => device_model_1.default.findOneAndDelete({ _id: id, user: userId });
exports.default = {
    getAllDevices,
    getAllDevicesforUser,
    addNewDevice,
    getDeviceByName,
    updateDeviceInfo,
    updateDeviceInfoForUser,
    deleteDevice
};
