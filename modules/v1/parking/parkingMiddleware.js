const mongoose = require('mongoose');
const isISODate = require('is-iso-date');
const constants = require('../../../config/constants');
const logger = require('../../../helper/logger');

const Parking = mongoose.model('parking');
const { messages, code } = constants;

// StatusCode
const errUnthorized = code.error.unauthorized;

const checkParkingId = (req, res, next) => {
  const { id } = req.params;
  Parking.findById(id)
    .then(((parkingFound) => {
      if (!parkingFound) return res.status(errUnthorized).json({ error: messages.INVALID_USER_ID });
      req._parking = parkingFound;
      next();
    }))
    .catch((err) => {
      logger.error('checkParkingId error : ', err);
      return res.status(code.error.badRequest).json({ error: messages.INVALID_USER_ID });
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
};

module.exports = parkingMiddleware;
