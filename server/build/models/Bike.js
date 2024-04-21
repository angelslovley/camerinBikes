"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bikeSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    model: String,
    color: String,
    img: String,
    address: String,
    rating: {
        userId: String,
        rate: Number,
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Bike', bikeSchema);
