const mongoose = require('mongoose');
const passwordRules = require('password-rules');
const isISODate = require('is-iso-date');
const constants = require('../../../config/constants');
const logger = require('../../../helper/logger');


const passwordPolicy = {
  minimumLength: 8,
  maximumLength: 30,
  requireCapital: true,
  requireLower: true,
  requireNumber: false,
  requireSpecial: false,
};

const Merchant = mongoose.model('merchant');
const { messages, code } = constants;

// StatusCode
const errUnthorized = code.error.unauthorized;

// Error Handling
const unauthorizedError = { code: errUnthorized, error: messages.UNAUTHORIZED };

const checkMerchantId = (req, res, next) => {
  const { id } = req.params;
  Merchant.findById(id)
    .then(((merchantFound) => {
      if (!merchantFound) return res.status(errUnthorized).json({ error: messages.INVALID_USER_ID });
      req._merchant = merchantFound;
      next();
    }))
    .catch((err) => {
      logger.error('checkMerchantId error : ', err);
      return res.status(code.error.badRequest).json({ error: messages.INVALID_USER_ID });
    });
};

const checkMerchantRoles = (req, res, next) => {
  const token = req._token;
  Merchant.findById(token._access_id)
    .then((foundMerchant) => {
      if (foundMerchant.merchantRoles === 'allowCreateNewMerchants') {
        req._isAdmin = true;
        next();
      } else {
        return res.status(errUnthorized).json({ error: unauthorizedError.error });
      }
    })
    .catch((err) => {
      logger.error('checkMerchantRoles error : ', err);
      return res.status(code.error.internalServerError).json({ error: err.error || err });
    });
};

// Email should not be updated in PUT /merchant/id
const customValidations = (req, res, next) => {
  // email cant be updated
  if (req.body.email) {
    return res.status(code.error.badRequest).json({ error: messages.ERR_EMAIL_UDATE });
  }
  // password validations
  if (req.body.password) {
    const hasError = passwordRules(req.body.password, passwordPolicy);
    if (hasError) {
      return res.status(code.error.badRequest).json({ error: hasError.sentence });
    }
  }
  // ISO date validation
  if (req.body.dateOfBirth) {
    const isoDate = isISODate(req.body.dateOfBirth);
    if (!isoDate) {
      return res.status(code.error.badRequest).json({ error: 'dateOfBirth should be an ISOdate' });
    }
  }
  next();
};

const passwordPolicyForUpdateMerchant = (req, res, next) => {
  if (!req.body.password) {
    next();
  } else {
    const hasError = passwordRules(req.body.password, passwordPolicy);

    if (hasError) {
      return res.status(code.error.badRequest).json({ error: hasError.sentence });
    }
    next();
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


const merchantMiddleware = {
  checkMerchantId,
  checkMerchantRoles,
  customValidations,
  passwordPolicyForUpdateMerchant,
  checkIsoDate,
};

module.exports = merchantMiddleware;
