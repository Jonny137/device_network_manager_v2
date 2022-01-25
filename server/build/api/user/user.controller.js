"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeAccount = exports.verifyToken = exports.changeUsername = exports.logout = exports.login = exports.createAccount = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_service_1 = __importDefault(require("./user.service"));
const logger_1 = __importDefault(require("../../services/logger"));
const utils_1 = require("../../services/utils");
const http_error_1 = __importDefault(require("../../services/errors/http.error"));
const createAccount = async (req, res, next) => {
    try {
        const newUser = await user_service_1.default.addUserAccount(req.body);
        (0, utils_1.sendResponse)(res, newUser);
    }
    catch (error) {
        if (error.code === 11000) {
            next(new http_error_1.default(400, 'Duplicated username.'));
        }
        logger_1.default.error('Error during adding user account: ', error);
        next(new http_error_1.default());
    }
};
exports.createAccount = createAccount;
exports.login = (0, utils_1.wrapAsync)(async (req, res, next) => {
    const credentials = req.body;
    const user = await user_service_1.default.getUserByName(credentials.username);
    if (!user) {
        logger_1.default.error('Error during login, finding user');
        next(new http_error_1.default(400, 'Invalid credentials.'));
    }
    if (!(await user.validatePassword(credentials.password))) {
        logger_1.default.error('Error during login, validating password');
        next(new http_error_1.default(400, 'Invalid credentials.'));
    }
    const token = (0, jsonwebtoken_1.sign)({
        userId: user.id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '2h' });
    (0, utils_1.sendResponse)(res, token);
});
const logout = async (req, res, next) => {
    const userId = req.userId;
    const user = await user_service_1.default.getUserById(userId);
    if (!user) {
        logger_1.default.error('Error during lougout, invalid user');
        next(new http_error_1.default(400, 'Invalid user.'));
    }
    (0, utils_1.sendResponse)(res, 'Successfully logged out.');
};
exports.logout = logout;
exports.changeUsername = (0, utils_1.wrapAsync)(async (req, res, next) => {
    const userId = req.userId;
    const newUsername = req.body.username;
    let newUser = null;
    const user = await user_service_1.default.getUserById(userId);
    if (!user) {
        logger_1.default.error('Error during changing username, invalid user!', user);
        next(new http_error_1.default(400, 'Invalid user.'));
    }
    const usernamePresent = await user_service_1.default.getUserByName(newUsername);
    if (!usernamePresent) {
        logger_1.default.error('Username must be unique!', user);
        next(new http_error_1.default(400, 'Invalid user.'));
    }
    try {
        newUser = await user_service_1.default.changeUsername(user.id, newUsername);
    }
    catch (error) {
        next(new http_error_1.default());
    }
    (0, utils_1.sendResponse)(res, newUser);
});
const verifyToken = async (req, res, _next) => {
    const user = {
        id: req.userId,
        username: req.username
    };
    (0, utils_1.sendResponse)(res, user);
};
exports.verifyToken = verifyToken;
const revokeAccount = async (req, res, next) => {
    const userId = req.userId;
    let user = null;
    try {
        user = await user_service_1.default.deleteUser(userId);
    }
    catch (error) {
        logger_1.default.error('Error during account revoking, invalid user');
        next(new http_error_1.default());
    }
    (0, utils_1.sendResponse)(res, user);
};
exports.revokeAccount = revokeAccount;
