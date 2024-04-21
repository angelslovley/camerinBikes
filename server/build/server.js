"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const startSetup_1 = __importDefault(require("setup/startSetup"));
const routesSetup_1 = __importDefault(require("setup/routesSetup"));
const middlewaresSetup_1 = __importDefault(require("setup/middlewaresSetup"));
require("setup/databaseSetup");
exports.server = (0, express_1.default)();
(0, middlewaresSetup_1.default)(exports.server);
(0, routesSetup_1.default)(exports.server);
(0, startSetup_1.default)(exports.server);
