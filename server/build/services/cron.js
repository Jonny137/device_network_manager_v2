"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const ping_1 = require("./ping");
const startCron = async () => {
    node_cron_1.default.schedule('* * * * *', ping_1.pingDevices);
    await (0, ping_1.pingDevices)();
};
exports.startCron = startCron;
