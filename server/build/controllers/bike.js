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
const Bike_1 = __importDefault(require("models/Bike"));
const validation_1 = require("utils/validation");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const env_1 = require("config/env");
class BikeController {
    constructor() {
        this.upload = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path_1.default.join(__dirname, '.', '..', 'uploads'));
                },
                filename: function (req, file, cb) {
                    const uniqueSuffix = req.params.bikeId;
                    cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
                }
            })
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bikes = yield Bike_1.default.find();
                return res.json(bikes);
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        });
    }
    deleteBike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bikeId = req.params.bikeId;
                yield Bike_1.default.deleteOne({ _id: bikeId });
                res.json('bike deleted!');
            }
            catch (error) {
                return res.status(401).json(error.message);
            }
        });
    }
    createBike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isNameExisting = yield Bike_1.default.findOne({ name: req.body.name });
                const { error } = (0, validation_1.createBikeValidation)(req.body);
                if (error)
                    throw Error(error.details[0].message);
                if (isNameExisting)
                    throw Error('This bike already exists.');
                const newBike = yield new Bike_1.default(req.body);
                newBike.save();
                return res.json(newBike);
            }
            catch (error) {
                return res.status(401).json(error.message);
            }
        });
    }
    editBike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bikeId = req.params.bikeId;
                const updatedBike = req.body;
                const { error } = (0, validation_1.editBikeValidation)(req.body);
                if (error)
                    throw Error(error.details[0].message);
                const newBike = yield Bike_1.default.findByIdAndUpdate(bikeId, updatedBike, { new: true });
                return res.json(newBike);
            }
            catch (error) {
                return res.status(401).json(error.message);
            }
        });
    }
    imageUploader(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `http://127.0.0.1:${env_1.PORT}/static/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
                return res.json({ image: path });
            }
            catch (error) {
                return res.status(401).json(error.message);
            }
        });
    }
    rateBike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, validation_1.rateBikeValidation)(req.body);
                if (error)
                    throw Error(error.details[0].message);
                const token = req.cookies.token || '';
                const bikeId = req.params.bikeId;
                const rateGiven = req.body.rate;
                const { _id } = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
                const rating = [{
                        userId: _id,
                        rate: rateGiven
                    }];
                const newBike = yield Bike_1.default.findByIdAndUpdate(bikeId, { rating }, { new: true });
                return res.json(newBike);
            }
            catch (error) {
                return res.status(401).json(error.message);
            }
        });
    }
}
exports.default = new BikeController();
