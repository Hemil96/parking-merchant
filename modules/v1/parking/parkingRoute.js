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

// /parking
// parkingRouter.get('/:id', [parkingMiddleware.checkParkingId, middleware.checkToken], parkingCtr.getparkingById); // Retrive parking by ID
// parkingRouter.patch('/:id', [middleware.checkToken, parkingMiddleware.checkParkingId], parkingCtr.updateParking); // Update Parking
// parkingRouter.delete('/:id', [middleware.checkToken, parkingMiddleware.checkParkingId], parkingCtr.deleteParking); // Delete Parking

// Premises informartion
parkingRouter.post('/permisesInfo', middleware.checkToken, parkingCtr.createPremisesInformation); // Create New Premises
parkingRouter.get('/permisesInfo/:id', [parkingMiddleware.checkPremisesId, middleware.checkToken], parkingCtr.getPremisesById); // Retrive Premises by ID
parkingRouter.patch('/permisesInfo/:id', [middleware.checkToken, parkingMiddleware.checkPremisesId], parkingCtr.updatePremises); // Update Premises
parkingRouter.delete('/permisesInfo/:id', [middleware.checkToken, parkingMiddleware.checkPremisesId], parkingCtr.deletePremises); // Update Premises


// My parking
parkingRouter.post('/myParking', middleware.checkToken, parkingCtr.createMyparking); // Create New My Parking
parkingRouter.get('/myParking/:id', [parkingMiddleware.checkMyParkingId, middleware.checkToken], parkingCtr.getMyParkingById); // Retrive My Parking by ID
parkingRouter.patch('/myParking/:id', [middleware.checkToken, parkingMiddleware.checkMyParkingId], parkingCtr.updateMyParking); // Update My Parking
parkingRouter.delete('/myParking/:id', [middleware.checkToken, parkingMiddleware.checkMyParkingId], parkingCtr.deleteMyparking); // Update My Parking


// Export
module.exports = { parkingRouter, parkingsRouter };
