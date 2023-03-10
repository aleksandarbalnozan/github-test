"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const Logging_1 = __importDefault(require("./library/Logging"));
const config_1 = require("./config/config");
const ProjectRoutes_1 = __importDefault(require("./routes/ProjectRoutes"));
const router = (0, express_1.default)();
StartServer();
function StartServer() {
    router.use((req, res, next) => {
        /** Log the requests */
        Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json);
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Controll-Allow-Origin', '*');
        res.header('Access-Controll-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/', ProjectRoutes_1.default);
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging_1.default.error(error);
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        Logging_1.default.info(`Server is running on port ${config_1.config.server.port}.`);
    });
}
