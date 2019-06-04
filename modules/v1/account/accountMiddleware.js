const mongoose = require('mongoose');
const isISODate = require('is-iso-date');
const { check, validationResult } = require('express-validator/check');

const constants = require('../../../config/constants');
const logger = require('../../../helper/logger');
const Utils = require('../../../helper/utils');

const Merchant = mongoose.model('merchant');
 const { messages, code } = constants;

const validationArr = [
  [
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 }),
  ],
];


// Email should be unique
const isUniqueEmail = (req, res, next) => {
  logger.info('Inside "isUniqueEmail" in accountMiddleware...');
  const { email } = req.body;
  Merchant.findOne({ email: email })
    .then((foundMerchant) => {
      if (!foundMerchant) {
        next();
      } else {
        return res.status(code.error.badRequest).json({ error: messages.EMAIL_ID_EXISTS });
      }
    })
    .catch((err) => {
      logger.error('Error inside "isUniqueEmail" accountMiddleware...', err);
      return res.status(code.error.internalServerError).json({ error: err.error || err });
    });
};

const checkJwtToken = (req, res, next) => {
  logger.info('Inside "checkJwtToken" in accountMiddleware...');
  const token = req.headers['x-auth-new-merchant-token'];
  if (!token) {
    logger.error('Token not provided');
    return res.status(code.error.unauthorized).json({ error: messages.UNAUTHORIZED });
  }
  next();
};

// Email should exist to get verification mail
const checkEmail = (req, res, next) => {
  logger.info('Inside "checkEmail" in accountMiddleware...');

  const { email } = req.headers;
  if (!email) {
    return res.status(400).json({ error: messages.ERR_VALID_EMAIL });
  }
  Merchant.find({ email })
    .then((foundMerchant) => {
      if (!foundMerchant || foundMerchant.length < 1) {
        return res.status(400).json({ error: messages.ERR_VALID_EMAIL });
      }
      next();
    })
    .catch((err) => {
      logger.error('Error inside "checkEmail" in accountMiddleware...', err);
      return res.status(500).json({ error: messages.ERR_INTERNAL_SERVER });
    });
};

// Check the merchant is admin or not
const checkMerchantRoles = (req, res, next) => {
  logger.info('Inside "checkMerchantRoles" in accountMiddleware...');
  const merchantId = (req._merchant) ? req._merchant.merchantId : req._token._access_id;
  Merchant.findById(merchantId)
    .then((foundMerchant) => {
      if (foundMerchant.merchantRoles === 'allowCreateNewMerchants') {
        req._isAdmin = true;
      }
      next();
    })
    .catch((err) => {
      logger.error('checkMerchantRoles error : ', err);
      return res.status(code.error.internalServerError).json({ error: err.error || err });
    });
};

const checkMerchantId = (req, res, next) => {
  const { id } = req.params;
  Merchant.findById(id)
    .then(((merchantFound) => {
      if (req._isAdmin) {
        next();
      } else {
        if (!merchantFound) return res.status(code.error.badRequest).json({ error: messages.INVALID_USER_ID });
        const merchantId = merchantFound._access_id || merchantFound._id;
        if (String(merchantId) != String(req._token._access_id) && !req._isAdmin) {
          return res.status(code.error.unauthorized).json({ error: messages.UNAUTHORIZED });
        }
        req._merchant = merchantFound;
        next();
      }
    }))
    .catch((err) => {
      logger.error('checkMerchantId error : ', err);
      return res.status(code.error.badRequest).json({ error: messages.INVALID_USER_ID });
    });
};

// Email should not be updated in PUT /account/id
const emailUpdate = (req, res, next) => {
  if (!req.body.email) {
    next();
  } else {
    return res.status(code.error.badRequest).json({ error: messages.ERR_EMAIL_UDATE });
  }
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

const checkOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const foundMerchant = await Utils.findResource({ email }, Merchant);
    if (foundMerchant.otp === otp) {
      return next();
    }
    return res.status(code.error.unauthorized).json({ error: messages.UNAUTHORIZED });
  } catch (error) {
    logger.error('Error inside checkOTP ...', error);
    return res.status(code.error.internalServerError).json({ error: messages.ERR_INTERNAL_SERVER, data: error });
  }
};


const accountMiddleware = {
  isUniqueEmail,
  checkJwtToken,
  checkEmail,
  checkMerchantRoles,
  checkMerchantId,
  emailUpdate,
  checkIsoDate,
  validationArr,
  checkOTP,

};

module.exports = accountMiddleware;
