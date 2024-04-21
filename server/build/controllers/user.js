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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("models/User"));
const validation_1 = require("utils/validation");
const env_1 = require("config/env");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies.token || '';
                const { role, _id } = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
                if (role === 'user') {
                    const user = yield User_1.default.findOne({ _id });
                    return res.json([user]);
                }
                const users = yield User_1.default.find();
                return res.json(users);
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = (0, validation_1.signInValidation)(req.body);
                const user = yield User_1.default.findOne({ email: req.body.email }).select('+password').exec();
                if (error)
                    throw Error(error.details[0].message);
                if (!user)
                    throw Error('E-mail or password invalid.');
                const userPassword = user.password; // Ensure user.password is defined
                if (!userPassword)
                    throw Error('User password is not defined.');
                const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, userPassword);
                if (!isPasswordValid)
                    throw Error('E-mail or password invalid.');
                const userObject = user.toObject(); // Convert user document to a plain JavaScript object
                const { password } = userObject, userPL = __rest(userObject, ["password"]);
                const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, env_1.JWT_SECRET, { expiresIn: "2h" });
                res.cookie('token', token, { maxAge: 120 * 120 * 24 * 7, httpOnly: true });
                return res.json(userPL);
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // To ease the validation of the app, I am forcing to create an admin account.
                const admin = { email: "admin@admin.com", name: 'Admin', role: 'admin', password: 'admin123' };
                const hasAdminAccount = yield User_1.default.findOne({ email: admin.email });
                if (!hasAdminAccount) {
                    const adminPassword = yield bcrypt_1.default.hash(admin.password, 10);
                    const newAdmin = Object.assign(Object.assign({}, admin), { password: adminPassword });
                    const adminCreated = new User_1.default(newAdmin);
                    yield adminCreated.save();
                }
                // End creating admin account.
                const isEmailExisting = yield User_1.default.findOne({ email: req.body.email });
                if (!isEmailExisting) {
                    const { error } = (0, validation_1.signUpValidation)(req.body);
                    if (error)
                        throw Error(error.details[0].message);
                    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
                    const newUser = Object.assign(Object.assign({}, req.body), { role: 'user', password: hashedPassword });
                    const userCreated = new User_1.default(newUser);
                    yield userCreated.save();
                    if (!userCreated)
                        throw Error("Failed to create user");
                    const userObject = userCreated.toObject(); // Convert to plain JavaScript object
                    const { password } = userObject, userCreatedPL = __rest(userObject, ["password"]);
                    const token = jsonwebtoken_1.default.sign({ _id: userCreated._id, role: userCreated.role }, env_1.JWT_SECRET, { expiresIn: "2h" });
                    res.cookie('token', token, { maxAge: 120 * 120 * 24 * 7, httpOnly: true });
                    return res.json(userCreatedPL);
                }
                else {
                    throw Error('E-mail unavailable.');
                }
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                yield User_1.default.deleteOne({ _id: userId });
                res.json('User deleted!');
            }
            catch (error) {
                return res.json(error.message);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isEmailExisting = yield User_1.default.findOne({ email: req.body.email });
                const { error } = (0, validation_1.createUserValidation)(req.body);
                if (error)
                    throw Error(error.details[0].message);
                if (isEmailExisting)
                    throw Error('E-mail unavailable.');
                const hashedPassword = yield bcrypt_1.default.hashSync(req.body.password, 10);
                const newUser = Object.assign(Object.assign({}, req.body), { password: hashedPassword });
                const userCreated = new User_1.default(newUser);
                yield userCreated.save();
                const userObject = userCreated.toObject(); // Convert userCreated document to a plain JavaScript object
                const { password } = userObject, userCreatedPL = __rest(userObject, ["password"]);
                return res.json({ error, user: userCreatedPL });
            }
            catch (error) {
                return res.status(400).json(error.message);
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const updatedUser = req.body;
                const { error } = (0, validation_1.editUserValidation)(req.body);
                if (error)
                    throw Error(error.details[0].message);
                const newUser = yield User_1.default.findByIdAndUpdate(userId, updatedUser, { new: true });
                return res.json(newUser);
            }
            catch (error) {
                return res.json(error.message);
            }
        });
    }
}
exports.default = new UserController();
