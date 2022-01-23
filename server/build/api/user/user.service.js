"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const addUserAccount = async (credentials) => {
    const newUser = new user_model_1.default(credentials);
    return newUser.save();
};
const getUserByName = async (username) => await user_model_1.default.findOne({ username });
const getUserById = async (id) => await user_model_1.default.findById({ _id: id });
const changeUsername = async (id, username) => await user_model_1.default.findByIdAndUpdate({ _id: id }, { username }, { returnOriginal: false });
const deleteUser = async (id) => await user_model_1.default.findByIdAndRemove({ _id: id });
exports.default = {
    addUserAccount,
    getUserByName,
    getUserById,
    changeUsername,
    deleteUser
};
