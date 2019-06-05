const express = require('express');
const parkingCtr = require('./parkingController');
const middleware = require('../../../middleware');
const validationRules = require('./parkingValidationRules');
const parkingMiddleware = require('./parkingMiddleware');

// Sapareting Routes for Parking and Parkings
const parkingRouter = express.Router();
const parkingsRouter = express.Router();

// /parkings
parkingsRouter.get('/', middleware.checkToken, parkingCtr.getAllParkings); // Retrive All Parkings
parkingsRouter.post('/', middleware.checkToken, parkingCtr.createParking); // Create New Parking

// /parking
parkingRouter.get('/:id', [parkingMiddleware.checkParkingId, middleware.checkToken], parkingCtr.getparkingById); // Retrive parking by ID
parkingRouter.patch('/:id', [middleware.checkToken, parkingMiddleware.checkParkingId], parkingCtr.updateParking); // Update Parking
parkingRouter.delete('/:id', [middleware.checkToken, parkingMiddleware.checkParkingId], parkingCtr.deleteParking); // Delete Parking

// Export
module.exports = { parkingRouter, parkingsRouter };
