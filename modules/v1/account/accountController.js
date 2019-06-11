const mongoose = require('mongoose');
const request = require('superagent');
const jwt = require('jsonwebtoken');

const _ = require('lodash');
const { check, validationResult } = require('express-validator/check');
const logger = require('../../../helper/logger');
const constants = require('../../../config/constants');
const Utils = require('../../../helper/utils');

const AccountUtils = require('./accountUtils');

const Merchant = mongoose.model('merchant');
const { messages, code } = constants;

// POST /account/email
const create = (req, res) => {
  logger.info('Step 1 : Inside accountController "create"...');

  // Creating User
  const { body } = req;
  AccountUtils.create(body)
    .then(async (createUtilResponse) => {
      const token = await AccountUtils.encodeToken(createUtilResponse.user._id);
      createUtilResponse.token = token;
      return res.set({ 'x-auth-token': token }).status(code.created).json({ message: messages.CREATE_SUCCESS, data: createUtilResponse });
    })
    .catch((err) => {
      logger.error('Error inside accountController "create"...', err);
      return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: err });
    });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await Utils.findResource({ email }, Merchant);
    if (!foundUser) {
      return res.status(code.error.unauthorized).json({ error: messages.UNAUTHORIZED });
    }
    const passMatch = await Utils.comparePassword(password, foundUser.password);
    if (!passMatch) {
      return res.status(code.error.unauthorized).json({ error: messages.UNAUTHORIZED });
    }
    const token = await AccountUtils.encodeToken(foundUser._id);
    return res.status(code.success).json({ message: 'Login Success', token: token });
  } catch (error) {
    return res.status(code.error.notFound).json({ error: messages.UNAUTHORIZED, data: error });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const updatedUser = await Merchant.findOneAndUpdate({ email }, {
      $set: {
        isActiveAccount: true,
        isEmailVerified: true,
      },
    }, { new: true });
    return res.status(code.success).json({ message: messages.VERIFY_SUCCESS, data: updatedUser });
  } catch (error) {
    logger.error('Error inside verifyOTP ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};


const accountCtr = {
  create,
  verifyOTP,
  login,
};

module.exports = accountCtr;
