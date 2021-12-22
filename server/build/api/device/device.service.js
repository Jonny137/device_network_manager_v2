"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_model_1 = __importDefault(require("./device.model"));
const getAllDevices = async () => device_model_1.default.find();
const addNewDevice = async (device) => {
    const newDevice = new device_model_1.default(device);
    return newDevice.save();
};
// const getConferenceById = async (id: string): Promise<IDevice | null> =>
//   Device.findById(id);
// const getConferenceByIdLean = async (id: string): Promise<IDevice | null> =>
//   Device.findById(id).lean();
// const createConference = async (
//   conference: IDevice
// ): Promise<IDevice> => {
//   const newConference = new Device(conference);
//   return newConference.save();
// };
// const updateConference = async (
//   id: string,
//   conference: IDevice
// ): Promise<IDevice | null> => Device.findByIdAndUpdate(id, conference);
// // TODO delete all booking relalted to this conferenece
// const deleteConferenceById = async (id: string): Promise<IDevice | null> =>
//   Device.findByIdAndDelete(id);
exports.default = {
    //   getConferenceById,
    //   getConferenceByIdLean,
    //   createConference,
    //   updateConference,
    //   deleteConferenceById,
    getAllDevices,
    addNewDevice
};
