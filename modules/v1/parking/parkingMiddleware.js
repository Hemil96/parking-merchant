const mongoose = require('mongoose');
const isISODate = require('is-iso-date');
const constants = require('../../../config/constants');
const logger = require('../../../helper/logger');

const Parking = mongoose.model('parking');
const Premises = mongoose.model('premises');
const Myparking = mongoose.model('myParking');


const { messages, code } = constants;

// StatusCode
const errUnthorized = code.error.unauthorized;

const checkParkingId = (req, res, next) => {
  const { id } = req.params;
  Parking.findById(id)
    .then(((parkingFound) => {
      if (!parkingFound) return res.status(errUnthorized).json({ error: 'Invalid Parking ID' });
      req._parking = parkingFound;
      next();
    }))
    .catch((err) => {
      logger.error('checkParkingId error : ', err);
      return res.status(code.error.badRequest).json({ error: 'Invalid Parking ID' });
    });
};


const checkPremisesId = (req, res, next) => {
  const { id } = req.params;
  Premises.findById(id)
    .then(((parkingFound) => {
      if (!parkingFound) return res.status(errUnthorized).json({ error: 'Invalid Premises ID' });
      req._parking = parkingFound;
      next();
    }))
    .catch((err) => {
      logger.error('checkParkingId error : ', err);
      return res.status(code.error.badRequest).json({ error: 'Invalid Premises ID' });
    });
};

const checkMyParkingId = (req, res, next) => {
  const { id } = req.params;
  Myparking.findById(id)
    .then(((parkingFound) => {
      if (!parkingFound) return res.status(errUnthorized).json({ error: 'Invalid myParking ID' });
      req._parking = parkingFound;
      next();
    }))
    .catch((err) => {
      logger.error('checkParkingId error : ', err);
      return res.status(code.error.badRequest).json({ error: 'Invalid myParking ID' });
    });
};

const checkIsoDate = (req, res, next) => {
  // ISO date validation
  if (req.body.dateOfBirth) {
    const isoDate = isISODate(req.body.dateOfBirth);
    if (!isoDate) {
      return res.status(code.error.badRequest).json({ error: 'dateOfBirth should be an ISOdate' });
    }
  }
  next();
};

const parkingMiddleware = {
  checkParkingId,
  checkIsoDate,
  checkPremisesId,
  checkMyParkingId,
};

module.exports = parkingMiddleware;
