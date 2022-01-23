"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerJson = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDef = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Device Network Monitor',
            description: 'Application for monitoring of device/server network status.',
            version: '1.0.0',
            contact: {
                name: 'Nikola Stevanovic',
                email: 'jonnystevanovic@gmail.com'
            }
        },
        servers: [
            {
                url: process.env.SWAGGER_BASE
            },
        ],
    },
    apis: ['./build/swagger/*.swagger.js'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerDef);
const swaggerJson = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.swaggerSpec);
};
exports.swaggerJson = swaggerJson;
