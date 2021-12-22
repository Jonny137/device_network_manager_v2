import { NextFunction, Request, Response } from 'express';

import { IDevice } from './device.model';
import logger from '../../services/logger';
import deviceService from './device.service';
import { sendResponse } from '../../services/utils';
import HttpError from '../../services/errors/http.error';

export const getAllDevicesForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;

        const devices: IDevice[] | null = await deviceService.getAllDevicesforUser(userId);
        sendResponse(res, devices);
    } catch (error) {
        logger.error('Error during fetching all devices: ', error);
        next(new HttpError());
    }
}

export const addNewDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let deviceInfo = req.body;
        deviceInfo['user'] = req.userId;

        const newDevice: IDevice | null = await deviceService.addNewDevice(deviceInfo);
        sendResponse(res, newDevice);
    } catch (error) {
        logger.error('Error during device addition: ', error);
        next(new HttpError())
    }
}

export const getDeviceByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.params;
        const userId = req.userId;
        const device: IDevice | null = await deviceService.getDeviceByName(name, userId);

        sendResponse(res, device);
    } catch (error) {
        logger.error('Error during fetching device by name: ', error);
        next(new HttpError());
    }
}

export const updateDeviceInfoForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        
        const device: IDevice | null = await deviceService.updateDeviceInfoForUser(
            id,
            req.body,
            userId
        );

        sendResponse(res, device);
    } catch (error) {
        logger.error('Error during device update: ', error);
        next(new HttpError());
    }
}

export const deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const deletedDevice = await deviceService.deleteDevice(id, userId);

        sendResponse(res, deletedDevice);
    } catch (error) {
        logger.error('Error during device deletion: ', error);
        next(new HttpError());
    }
}
