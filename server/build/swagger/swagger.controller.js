"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerJson = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDef = {
    info: {
        title: 'Device Network Monitor',
        description: 'Device network monitor',
        version: '1.0.0',
        contact: {
            name: 'Nikola Stevanovic',
            email: 'jonnystevanovic@gmail.com'
        }
    },
    apis: ['./build/swagger/*.swagger.js']
};
exports.swaggerSpec = swagger_jsdoc_1.default({
    definition: swaggerDef.info,
    apis: swaggerDef.apis
});
exports.swaggerJson = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(exports.swaggerSpec);
};
