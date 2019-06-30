const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const constants = require('./config/constants');
const utils = require('./helper/utils');

const logger = require('./helper/logger');

const Merchant = mongoose.model('merchant');


const { messages, code } = constants;

const checkToken = async (req, res, next) => {
  try {
    if (!req.headers || !req.headers['x-auth-token']) {
      return res.status(code.error.badRequest).json({ error: messages.TOKEN_REQ });
    }
    const token = req.headers['x-auth-token'];
    const userId = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await utils.findResource({ _id: userId }, Merchant);
    // Array destructing : user = user[0]
    if (!user) {
      return res.status(code.error.unauthorized).json({ error: messages.UNAUTHORIZED });
    }
    req._user = user;
    next();
  } catch (error) {
    logger.error('Error in  checkToken', error);
    return res.status(code.error.unauthorized).json({ error: messages.UNAUTHORIZED });
  }
};

const middleware = { checkToken };


module.exports = middleware;
