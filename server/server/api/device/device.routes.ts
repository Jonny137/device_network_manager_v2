import { Router } from 'express';
import { auth } from '../../middlewares/jwt.auth';
import {
    getAllDevicesForUser,
    getDeviceByName,
    addNewDevice,
    updateDeviceInfoForUser,
    deleteDevice
} from './device.controller';

const router = Router();

router
    .get('/', auth, getAllDevicesForUser)
    .get('/:name', auth, getDeviceByName)
    .post('/', auth, addNewDevice)
    .put('/:id', auth, updateDeviceInfoForUser)
    .delete('/:id', auth, deleteDevice)

export default router;
