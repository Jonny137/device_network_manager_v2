"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_auth_1 = require("../../middlewares/jwt.auth");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.createAccount);
router.post('/login', user_controller_1.login);
router.post('/logout', jwt_auth_1.auth, user_controller_1.logout);
router.patch('/username', jwt_auth_1.auth, user_controller_1.changeUsername);
router.post('/verify', jwt_auth_1.auth, user_controller_1.verifyToken);
router.post('/revoke', jwt_auth_1.auth, user_controller_1.revokeAccount);
exports.default = router;
