const mongoose = require('mongoose');
const _ = require('lodash');
const logger = require('../../../helper/logger');
const Utils = require('../../../helper/utils');

// Connect schema
const Merchant = mongoose.model('merchant');
// Retrive all Users
const create = (data) => {
  logger.info('Inside createUser util...');
  return new Promise((resolve, reject) => {
    logger.info('Inside the Util createUser...');
    const {
      fullName, phone, referralCode, email,
      password, pinlock,
    } = data;
    this.objectTocreate = {
      fullName,
      phone,
      referralCode: referralCode || '',
      email,
      password,
      pinlock,
    };
    utils.passToHash(password)
      .then((generatedHash) => {
        this.objectTocreate.password = generatedHash;
        return utils.createResource(this.objectTocreate, User);
      })
      .then((createdUser) => {
        const userToreturn = _.omit(createdUser, 'password');
        resolve(userToreturn);
      })
      .catch((err) => {
        logger.error(err);
        reject(err);
      });
  });
};

// Update user
const update = async (id, data) => {
  logger.info('Inside updateUser util...');
  if (data.password) {
    data.password = await Utils.passToHash(data.password);
  }
  return Utils.updateResource({ _id: id }, { $set: data }, User);
};

const userUtils = {
  create,
  update,
};

module.exports = userUtils;
