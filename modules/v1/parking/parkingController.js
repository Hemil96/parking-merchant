const mongoose = require('mongoose');

const _ = require('lodash');
const logger = require('../../../helper/logger');
const constants = require('../../../config/constants');

const Parking = mongoose.model('parking');
const ParkingUtils = require('./parkingUtils.js');
const utils = require('../../../helper/utils');


const { messages, code } = constants;

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

const parkingCtr = {
  createParking,
  getAllParkings,
  getparkingById,
  updateParking,
  deleteParking,
};

module.exports = parkingCtr;
