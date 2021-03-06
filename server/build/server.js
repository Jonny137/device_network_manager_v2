"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
const logger_1 = __importDefault(require("./services/logger"));
const db_1 = __importDefault(require("./services/db"));
const index_1 = __importDefault(require("./swagger/index"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const cron_1 = require("./services/cron");
const port = parseInt(process.env.PORT || '8080', 10);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
(0, routes_1.default)(app);
app.use('/', index_1.default);
app.use(error_middleware_1.default);
app.listen(port, () => {
    (0, cron_1.startCron)();
    logger_1.default.info(`Server is running on port ${port}`);
}).on('error', (error) => {
    logger_1.default.error('FATAL ERROR:', error);
    process.exit(-1);
});
