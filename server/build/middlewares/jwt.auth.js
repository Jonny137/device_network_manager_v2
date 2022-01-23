"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = __importDefault(require("../services/logger"));
const http_error_1 = __importDefault(require("../services/errors/http.error"));
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        logger_1.default.error('User authentication failed, no token provided.');
        next(new http_error_1.default(403, 'Authentication failed.'));
    }
    try {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
        const data = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.userId = data.userId;
        req.username = data.username;
        return next();
    }
    catch (error) {
        logger_1.default.error('User authentication failed, token invalid.');
        next(new http_error_1.default(403, 'Invalid token.'));
    }
};
exports.auth = auth;
