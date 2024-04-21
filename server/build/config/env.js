"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = exports.JWT_SECRET = exports.DB_HOST = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Environment
exports.NODE_ENV = process.env.NODE_ENV || 'dev';
// Port
exports.PORT = process.env.PORT || 8000;
// Database
exports.DB_HOST = process.env.DB_HOST || '';
// JWT Secret
exports.JWT_SECRET = process.env.JWT_SECRET || '';
exports.CLIENT_URL = 'http://localhost:3000';
