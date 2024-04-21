"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const env_1 = require("config/env");
// middlewares
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.default = (server) => {
    server.use(express_1.default.json());
    server.use((0, cors_1.default)({ origin: env_1.CLIENT_URL, credentials: true }));
    server.use('/static', express_1.default.static(path_1.default.join(__dirname, '.', '..', 'uploads')));
    server.use((0, cookie_parser_1.default)());
};
