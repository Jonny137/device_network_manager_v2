"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const device_controller_1 = require("./device.controller");
const router = express_1.Router();
router
    .get('/', device_controller_1.getAllDevices)
    // .get('/:name', getDeviceByName)
    .post('/', device_controller_1.addNewDevice);
// .put('/', updateDeviceInfo)
// .delete('/', deleteDevice)
// .get('/disc', getAllDisconnectedDevices)
exports.default = router;
