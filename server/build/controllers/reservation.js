"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Reservation_1 = __importDefault(require("models/Reservation"));
const validation_1 = require("utils/validation");
const env_1 = require("config/env");
class ReservationController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservations = yield Reservation_1.default.find();
                return res.json(reservations);
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        });
    }
    deleteReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservationId = req.params.reservationId;
                yield Reservation_1.default.deleteOne({ _id: reservationId });
                res.json('Reservation deleted!');
            }
            catch (error) {
                return res.json(error.message);
            }
        });
    }
    createReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, validation_1.createReservationValidation)(req.body);
                if (error)
                    throw Error(error.details[0].message);
                const newReservation = yield new Reservation_1.default(req.body);
                newReservation.save();
                return res.json(newReservation);
            }
            catch (error) {
                return res.json(error.message);
            }
        });
    }
    editReservation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservationId = req.params.reservationId;
                const updatedReservation = req.body;
                const { error } = (0, validation_1.editReservationValidation)(req.body);
                if (error)
                    throw Error(error.details[0].message);
                const newReservation = yield Reservation_1.default.findByIdAndUpdate(reservationId, updatedReservation, { new: true });
                return res.json({ reservation: newReservation });
            }
            catch (error) {
                return res.json(error.message);
            }
        });
    }
    userReservations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const reservations = yield Reservation_1.default.find({ userId });
                return res.json(reservations);
            }
            catch (error) {
                return res.json(error.message);
            }
        });
    }
    bikeReservations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bikeId = req.params.bikeId;
                const token = req.cookies.token || '';
                const { role, _id } = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
                if (role === 'user') {
                    const reservations = yield Reservation_1.default.find({ bikeId, userId: _id });
                    return res.json(reservations);
                }
                const reservations = yield Reservation_1.default.find({ bikeId });
                return res.json(reservations);
            }
            catch (error) {
                return res.json(error.message);
            }
        });
    }
}
exports.default = new ReservationController();
