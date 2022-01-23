"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(status = 500, message = 'Internal Server Error') {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.default = HttpError;
