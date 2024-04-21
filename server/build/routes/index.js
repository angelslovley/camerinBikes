"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenVerifier_1 = require("middlewares/tokenVerifier");
const user_1 = __importDefault(require("controllers/user"));
const bike_1 = __importDefault(require("controllers/bike"));
const reservation_1 = __importDefault(require("controllers/reservation"));
const routes = express_1.default.Router();
// Users and Authentication
routes.get('/api/user/users', tokenVerifier_1.protectedRoute, user_1.default.index);
routes.post('/api/user/signin', user_1.default.signIn);
routes.post('/api/user/signup', user_1.default.signUp);
routes.delete('/api/user/delete-user/:userId', tokenVerifier_1.adminRoute, user_1.default.deleteUser);
routes.patch('/api/user/edit-user/:userId', tokenVerifier_1.adminRoute, user_1.default.editUser);
routes.post('/api/user/create-user', tokenVerifier_1.adminRoute, user_1.default.createUser);
// Bikes
routes.get('/api/bike', tokenVerifier_1.protectedRoute, bike_1.default.index);
routes.delete('/api/bike/delete-bike/:bikeId', tokenVerifier_1.adminRoute, bike_1.default.deleteBike);
routes.patch('/api/bike/edit-bike/:bikeId', tokenVerifier_1.protectedRoute, bike_1.default.editBike);
routes.post('/api/bike/image/:bikeId', tokenVerifier_1.adminRoute, bike_1.default.upload.single('image'), bike_1.default.imageUploader);
routes.post('/api/bike/create-bike', tokenVerifier_1.adminRoute, bike_1.default.createBike);
routes.post('/api/bike/rate/:bikeId', tokenVerifier_1.protectedRoute, bike_1.default.rateBike);
// Reservations
routes.get('/api/reservation', tokenVerifier_1.adminRoute, reservation_1.default.index);
routes.get('/api/reservation/user/:userId', tokenVerifier_1.protectedRoute, reservation_1.default.userReservations);
routes.get('/api/reservation/bike/:bikeId', tokenVerifier_1.protectedRoute, reservation_1.default.bikeReservations);
routes.delete('/api/reservation/delete-reservation/:reservationId', tokenVerifier_1.protectedRoute, reservation_1.default.deleteReservation);
routes.patch('/api/reservation/edit-reservation/:reservationId', tokenVerifier_1.protectedRoute, reservation_1.default.editReservation);
routes.post('/api/reservation/create-reservation', tokenVerifier_1.protectedRoute, reservation_1.default.createReservation);
exports.default = routes;
