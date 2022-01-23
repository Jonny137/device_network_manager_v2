"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    const status = err.status;
    const message = err.message;
    res.status(status).send({
        status,
        message,
    });
};
exports.default = errorMiddleware;
