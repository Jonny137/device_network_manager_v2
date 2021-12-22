"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewDevice = exports.getAllDevices = void 0;
const logger_1 = __importDefault(require("../../services/logger"));
const device_service_1 = __importDefault(require("./device.service"));
exports.getAllDevices = async (req, res) => {
    try {
        const devices = await device_service_1.default.getAllDevices();
        return res.status(200).send({
            message: devices,
            status: 'OK'
        });
    }
    catch (error) {
        logger_1.default.error('Unable to retrieve devices: ', error);
        return res.send({ error: true, errorObject: error }).status(500);
    }
};
exports.addNewDevice = async (req, res) => {
    try {
        const newDevice = await device_service_1.default.addNewDevice(req.body);
        return res.status(200).send({
            message: newDevice,
            status: 'OK'
        });
    }
    catch (error) {
        return res.send({ error: true, errorObject: error }).status(400);
    }
};
// export const getConferenceById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const conference: IDevice | null = await deviceService.getConferenceById(
//       id
//     );
//     return res.send(conference).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
// export const hasConferenceWithId = async (id: string): Promise<boolean> => {
//   try {
//     const conference: IDevice | null = await deviceService.getConferenceByIdLean(
//       id
//     );
//     return !!conference;
//   } catch (error) {
//     logger.error('Has Conference with Id error: ', error);
//     return false;
//   }
// };
// export const createConference = async (req: Request, res: Response) => {
//   try {
//     const newConference: IDevice | null = await deviceService.createConference(
//       req.body
//     );
//     res.send(newConference).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
// export const updateConference = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const conference: IDevice | null = await deviceService.updateConference(
//       id,
//       req.body
//     );
//     res.send(conference).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
// export const deleteConferenceById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deletedConference = await deviceService.deleteConferenceById(id);
//     res.send(deletedConference).status(200);
//   } catch (error) {
//     return res.send({ error: true, errorObject: error }).status(400);
//   }
// };
