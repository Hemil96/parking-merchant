const mongoose = require('mongoose');

const _ = require('lodash');
const logger = require('../../../helper/logger');
const constants = require('../../../config/constants');

const Merchant = mongoose.model('merchant');
const MerchantUtils = require('./merchantUtils.js');
const utils = require('../../../helper/utils');


const { messages, code } = constants;

// StatusCode
const successMsgCode = code.success;
const errInternal = code.error.internalServerError;

// GET /merchants
const getAll = (req, res) => {
  logger.info('Inside get all merchants...');
  utils.findAll(Merchant)
    .then((merchants) => {
      // omiting password from the merchant object
      const merchantsToReturn = merchants.map((merchant) => {
        const newMerchant = _.omit(merchant, 'password');
        return newMerchant;
      });
      return res.status(successMsgCode).json({ message: messages.RETRIVE_SUCCESS, data: merchantsToReturn });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(err.code || code.error.internalServerError).json({ error: err.error || messages.ERR_INTERNAL_SERVER });
    });
};

// POST /merchants
const create = (req, res) => {
  logger.info('Inside create merchant');
  const { body } = req;
  MerchantUtils.create(body)
    .then((createdMerchant) => {
      return res.set({ location: `/api/v1/merchant/${createdMerchant._id}` }).status(code.created).json({ message: messages.CREATE_SUCCESS, data: createdMerchant });
    })
    .catch((err) => {
      logger.error(err);
      res.status(errInternal).json({ error: messages.ERR_INTERNAL_SERVER });
    });
};

// GET /merchant/:id
const getMerchantById = (req, res) => {
  logger.info('Inside the get merchant by Id...');
  utils.findResource({ _id: req.params.id }, Merchant)
    .then((findMerchantSuccess) => {
      const merchantToReturn = _.omit(findMerchantSuccess, 'password');
      return res.status(successMsgCode).json({ message: messages.RETRIVE_SUCCESS, data: merchantToReturn });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(err.code || code.error.internalServerError).json({ error: err.error || messages.ERR_INTERNAL_SERVER });
    });
};

// PUT /merchant/:id
const update = async (req, res) => {
  try {
    logger.info('Inside the update merchant by id...');
    const { id } = req.params;
    const updatedMerchant = await utils.updateResource({ _id: id }, { $set: req.body }, Merchant);
    const merchantToReturn = _.omit(updatedMerchant, 'password');
    return res.status(successMsgCode).json({ message: messages.UPDATE_SUCCESS, data: merchantToReturn });
  } catch (err) {
    logger.error(err);
    return res.status(err.code || code.error.internalServerError).json({ error: err.error || messages.ERR_INTERNAL_SERVER });
  }
};

// DELETE /merchant/:id
const deleteMerchant = (req, res) => {
  logger.info('Inside the delete merchant by id...');
  const { id } = req.params;
  Merchant.findByIdAndRemove(id)
    .then(() => {
      res.status(202).json({ message: messages.DELETE_SUCCESS });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(err.code || code.error.internalServerError).json({ error: err.error || messages.ERR_INTERNAL_SERVER });
    });
};

const merchantCtr = {
  getAll,
  create,
  getMerchantById,
  update,
  deleteMerchant,
};

module.exports = merchantCtr;
