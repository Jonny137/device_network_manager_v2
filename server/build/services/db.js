"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};
mongoose_1.default.connection.on('error', (err) => logger_1.default.error('Mongoose error:', err));
mongoose_1.default.connection.on('connected', () => logger_1.default.info('Connection to DB established successfully'));
mongoose_1.default.Promise = global.Promise;
exports.default = () => {
    mongoose_1.default.connect(process.env.MONGO_URI || '', dbOptions);
};
