const mongoose = require('mongoose');

const _ = require('lodash');
const logger = require('../../../helper/logger');
const constants = require('../../../config/constants');
const ParkingUtils = require('./parkingUtils.js');
const utils = require('../../../helper/utils');

const Parking = mongoose.model('parking');
const Premises = mongoose.model('premises');
const Myparking = mongoose.model('myParking');
const Merchant = mongoose.model('merchant');


const { messages, code } = constants;

/*
========= PARKING =========
*/

const createParking = async (req, res) => {
  logger.info('Inside in createParking ...');
  try {
    const {
      title, description, premisesName, zipCode,
      areaSize, timeStart, timeEnd, contactEmail,
      contactPhone, parkingChange, totalTwoWheelerSlots,
      totalFourWheelerSlots, isActive, address, location,
    } = req.body;

    const parkingToCreate = {
      title,
      premisesName,
      zipCode,
      areaSize,
      timeStart,
      timeEnd,
      contactPhone,
      parkingChange,
      totalTwoWheelerSlots,
      totalFourWheelerSlots,
      isActive,
      address,
      location,
      description: description || '',
      contactEmail: contactEmail || '',
    };
    const createdParking = await utils.createResource(parkingToCreate, Parking);
    return res.status(code.created).json({ message: messages.CREATE_SUCCESS, data: createdParking });
  } catch (error) {
    logger.error('Error inside createParking ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const getAllParkings = async (req, res) => {
  try {
    logger.info('Inside in getAllParkings ...');
    const allParkings = await utils.findAll(Parking);
    return res.status(code.success).json({ message: messages.RETRIVE_SUCCESS, data: allParkings });
  } catch (error) {
    logger.error('Error inside getAllParkings ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const getparkingById = async (req, res) => {
  try {
    logger.info('Inside in getparkingById ...');
    const foundParking = await utils.findResource({ _id: req.params.id }, Parking);
    return res.status(code.success).json({ message: messages.RETRIVE_SUCCESS, data: foundParking });
  } catch (error) {
    logger.error('Error inside getparkingById ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const updateParking = async (req, res) => {
  try {
    logger.info('Inside in updateParking ...');
    const updatedParking = await utils.updateResource({ _id: req.params.id }, req.body, Parking);
    return res.status(code.success).json({ message: messages.UPDATE_SUCCESS, data: updatedParking });
  } catch (error) {
    logger.error('Error inside updateParking ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const deleteParking = async (req, res) => {
  try {
    logger.info('Inside in deleteParking ...');
    const deletedParking = await Parking.deleteOne({ _id: req.params.id });
    return res.status(code.success).json({ message: messages.DELETE_SUCCESS, data: deletedParking });
  } catch (error) {
    logger.error('Error inside deleteParking ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

/*
========= PREMISES =========
*/

const createPremisesInformation = async (req, res) => {
  try {
    logger.info('Inside in createPremisesInformation ...');
    const objectToCreate = {
      premisesName: req.body.premisesName,
      location: req.body.location,
      maxVehicleCapacity: req.body.maxVehicleCapacity,
      merchantId: req._user._id,
    };
    const createdPremises = await utils.createResource(objectToCreate, Premises);
    const updatedMerchat = await utils.updateResource({ _id: req._user._id }, { premises: true }, Merchant);
    return res.status(code.created).json({ message: messages.CREATE_SUCCESS, data: createdPremises });
  } catch (error) {
    logger.error('Error inside createPremisesInformation ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const getPremisesById = async (req, res) => {
  try {
    logger.info('Inside in getPremisesById ...');
    const foundPremises = await utils.findResource({ _id: req.params.id }, Premises);
    return res.status(code.success).json({ message: messages.RETRIVE_SUCCESS, data: foundPremises });
  } catch (error) {
    logger.error('Error inside getPremisesById ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const updatePremises = async (req, res) => {
  try {
    logger.info('Inside in updatePremises ...');
    const objectToUpdate = req.body;
    objectToUpdate.isVerified = !!(objectToUpdate.isVerified);
    const updatedPremises = await utils.updateResource({ _id: req.params.id }, objectToUpdate, Premises);
    return res.status(code.success).json({ message: messages.UPDATE_SUCCESS, data: updatedPremises });
  } catch (error) {
    logger.error('Error inside updatePremises ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const deletePremises = async (req, res) => {
  try {
    logger.info('Inside in deletePremises ...');
    const deletedPremises = await Premises.deleteOne({ _id: req.params.id });
    return res.status(code.success).json({ message: messages.DELETE_SUCCESS, data: deletedPremises });
  } catch (error) {
    logger.error('Error inside deletePremises ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

/*
========= MY PARKING =========
*/

const createMyparking = async (req, res) => {
  try {
    logger.info('Inside in createMyparking ...');
    const objectToCreate = {
      totalTwoWheelerSlots: req.body.totalTwoWheelerSlots,
      totalFourWheelerSlots: req.body.totalFourWheelerSlots,
      contactPhoneNumber: req.body.contactPhoneNumber,
      timeEnd: req.body.timeEnd,
      timeStart: req.body.timeStart,
      parkingCharges: req.body.parkingCharges,
      name: req.body.name,
      merchantId: req._user._id,
    };
    const createdMyparking = await utils.createResource(objectToCreate, Myparking);
    const updatedMerchat = await utils.updateResource({ _id: req._user._id }, { myParking: true }, Merchant);

    return res.status(code.created).json({ message: messages.CREATE_SUCCESS, data: createdMyparking });
  } catch (error) {
    logger.error('Error inside createMyparking ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const getMyParkingById = async (req, res) => {
  try {
    logger.info('Inside in getMyParkingById ...');
    const foundMyParking = await utils.findResource({ _id: req.params.id }, Myparking);
    return res.status(code.success).json({ message: messages.RETRIVE_SUCCESS, data: foundMyParking });
  } catch (error) {
    logger.error('Error inside getMyParkingById ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const updateMyParking = async (req, res) => {
  try {
    logger.info('Inside in updateMyParking ...');
    const updatedMyParking = await utils.updateResource({ _id: req.params.id }, req.body, Myparking);
    return res.status(code.success).json({ message: messages.UPDATE_SUCCESS, data: updatedMyParking });
  } catch (error) {
    logger.error('Error inside updateMyParking ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const deleteMyparking = async (req, res) => {
  try {
    logger.info('Inside in deleteMyparking ...');
    const deletedMyparking = await Myparking.deleteOne({ _id: req.params.id });
    return res.status(code.success).json({ message: messages.DELETE_SUCCESS, data: deletedMyparking });
  } catch (error) {
    logger.error('Error inside deleteMyparking ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};

const parkingCtr = {
  createParking,
  getAllParkings,
  getparkingById,
  updateParking,
  deleteParking,

  createPremisesInformation,
  getPremisesById,
  updatePremises,
  deletePremises,

  createMyparking,
  getMyParkingById,
  updateMyParking,
  deleteMyparking,

};

module.exports = parkingCtr;
