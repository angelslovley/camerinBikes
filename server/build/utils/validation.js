"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editReservationValidation = exports.createReservationValidation = exports.rateBikeValidation = exports.editBikeValidation = exports.createBikeValidation = exports.createUserValidation = exports.editUserValidation = exports.signInValidation = exports.signUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpValidation = (body) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6),
    });
    return schema.validate(body);
};
exports.signUpValidation = signUpValidation;
const signInValidation = (body) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    });
    return schema.validate(body);
};
exports.signInValidation = signInValidation;
const editUserValidation = (body) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        role: joi_1.default.string().valid('admin', 'user')
    });
    return schema.validate(body);
};
exports.editUserValidation = editUserValidation;
const createUserValidation = (body) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6),
        role: joi_1.default.string().valid('admin', 'user')
    });
    return schema.validate(body);
};
exports.createUserValidation = createUserValidation;
const createBikeValidation = (body) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(4).required(),
        model: joi_1.default.string().min(1).required(),
        color: joi_1.default.string().min(3).required(),
        img: joi_1.default.string(),
        address: joi_1.default.string().required(),
    });
    return schema.validate(body);
};
exports.createBikeValidation = createBikeValidation;
const editBikeValidation = (body) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(4),
        model: joi_1.default.string().min(1),
        color: joi_1.default.string().min(3),
        img: joi_1.default.string(),
        address: joi_1.default.string(),
    });
    return schema.validate(body);
};
exports.editBikeValidation = editBikeValidation;
const rateBikeValidation = (body) => {
    const schema = joi_1.default.object({
        rate: joi_1.default.number().required(),
    });
    return schema.validate(body);
};
exports.rateBikeValidation = rateBikeValidation;
const createReservationValidation = (body) => {
    const schema = joi_1.default.object({
        userId: joi_1.default.string().required(),
        bikeId: joi_1.default.string().required(),
        startPeriod: joi_1.default.string().isoDate().required(),
        endPeriod: joi_1.default.string().isoDate().required(),
    });
    return schema.validate(body);
};
exports.createReservationValidation = createReservationValidation;
const editReservationValidation = (body) => {
    const schema = joi_1.default.object({
        userId: joi_1.default.string(),
        bikeId: joi_1.default.string(),
        startPeriod: joi_1.default.string().isoDate(),
        endPeriod: joi_1.default.string().isoDate(),
    });
    return schema.validate(body);
};
exports.editReservationValidation = editReservationValidation;
