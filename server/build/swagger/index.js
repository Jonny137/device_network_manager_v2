"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const router = (0, express_1.Router)();
const swagger_controller_1 = require("./swagger.controller");
// import YAML from 'yamljs';
// const swaggerDocument = YAML.load('./api-spec.yml');
// console.log(swaggerDocument);
router
    .get('/api-docs.json', swagger_controller_1.swaggerJson)
    .use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_controller_1.swaggerSpec));
exports.default = router;
