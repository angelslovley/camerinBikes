"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = exports.protectedRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("config/env");
const protectedRoute = (req, res, next) => {
    try {
        const token = req.cookies.token || '';
        if (!token)
            throw Error("You have no permissions.");
        jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
        next();
    }
    catch (error) {
        res.status(401).json(error.message);
    }
};
exports.protectedRoute = protectedRoute;
const adminRoute = (req, res, next) => {
    try {
        const token = req.cookies.token || '';
        if (!token)
            throw Error("You have no permissions.");
        const { role } = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
        if (role !== 'admin')
            throw Error("You don't have any permissions.");
        next();
    }
    catch (error) {
        res.status(401).json(error.message);
    }
};
exports.adminRoute = adminRoute;
