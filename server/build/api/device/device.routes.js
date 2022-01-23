"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_auth_1 = require("../../middlewares/jwt.auth");
const device_controller_1 = require("./device.controller");
const router = (0, express_1.Router)();
router
    .get('/', jwt_auth_1.auth, device_controller_1.getAllDevicesForUser)
    .get('/:name', jwt_auth_1.auth, device_controller_1.getDeviceByName)
    .post('/', jwt_auth_1.auth, device_controller_1.addNewDevice)
    .put('/:id', jwt_auth_1.auth, device_controller_1.updateDeviceInfoForUser)
    .delete('/:id', jwt_auth_1.auth, device_controller_1.deleteDevice);
exports.default = router;
