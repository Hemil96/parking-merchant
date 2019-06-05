const mongoose = require('mongoose');

const _ = require('lodash');
const logger = require('../../../helper/logger');
const constants = require('../../../config/constants');

const Parking = mongoose.model('parking');
const ParkingUtils = require('./parkingUtils.js');
const utils = require('../../../helper/utils');


const { messages, code } = constants;

// StatusCode
const successMsgCode = code.success;
const errInternal = code.error.internalServerError;
/* 
Location, Premises Name, ZIP code, Primary Area Size (m2), Vehicle type can fit-in (Car, 2 Wheelers)
Number of each vehicle type, Point of contact, Add Images
*/
const createParking = async (req, res) => {
  const {
    title, description, premisesName, zipCode,
    areaSize, timeStart, timeEnd, contactEmail, 
    contactPhone, parkingChange, totalTwoWheelerSlots,
    totalFourWheelerSlots, isActive, address, location
  } = req.body

  const parkingToCreate = {
    title,  premisesName, zipCode,
    areaSize, timeStart, timeEnd, 
    contactPhone, parkingChange, totalTwoWheelerSlots,
    totalFourWheelerSlots, isActive, address, location,
    description: description || '',
    contactEmail:contactEmail || '',
  }

  const createdParking = await utils.createResource(parkingToCreate, Parking) 
  return res.send(createdParking)
}

const getAllParkings = async (req, res) => {

}

const getparkingById = (req, res) => {

}

const updateParking = (req, res) => {

}

const deleteParking = (req, res) => {

}

const parkingCtr = {
  createParking,
  getAllParkings,
  getparkingById,
  updateParking,
  deleteParking
};

module.exports = parkingCtr;
