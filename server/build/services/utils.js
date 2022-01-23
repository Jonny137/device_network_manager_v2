"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAsync = exports.sendResponse = void 0;
const sendResponse = (res, message, status = 'OK', code = 200) => {
    return res.status(code).send({
        message,
        status
    });
};
exports.sendResponse = sendResponse;
const wrapAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);
exports.wrapAsync = wrapAsync;
