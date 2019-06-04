/* eslint-disable no-undef,no-unused-vars */


const {
  check,
  validationResult,
} = require('express-validator/check');
const {
  matchedData,
  sanitize,
} = require('express-validator/filter');
const constants = require('../../../config/constants');

const { code, message } = constants;


exports.checkValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const err = result.array()[0].msg;
    return res.status(code.error.badRequest).json({ error: err });
  }
  next();
};

exports.validate = (method) => {
  switch (method) {
  case 'login':
    return [
      check('name')
        .isLength({
          min: 1,
        })
        .withMessage(messages.checkIfRequired('name')),
      check('profileImage')
        .isLength({
          min: 1,
        })
        .withMessage(messages.checkIfRequired('profileImage')),
      check('email')
        .isLength({
          min: 1,
        })
        .withMessage(messages.checkIfRequired('Email'))
        .isEmail()
        .withMessage(messages.checkIfEmail('Email')),
      check('googleId')
        .isLength({
          min: 1,
        })
        .withMessage(messages.checkIfRequired('Google Id')),
      check('deviceType')
        .isLength({
          min: 1,
        })
        .withMessage(messages.checkIfRequired('Device type'))
        .isIn([
          constants.deviceType.android,
          constants.deviceType.iOS,
          constants.deviceType.web,
        ])
        .withMessage(messages.checkIfValidValue('Device type')),
      check('deviceToken')
        .isLength({
          min: 1,
        })
        .withMessage(messages.checkIfRequired('Device Token')),
    ];
    break;
  case 'signup':
    return [
      check('password')
        .isLength({
          min: 1,
        })
        .withMessage(messages.checkIfRequired('Password')),
      check('email')
        .isLength({
          min: 1,
        })
        .withMessage(messages.checkIfRequired('Email'))
        .isEmail()
        .withMessage(messages.checkIfEmail('Email')),
    ];
  default:
    return [];
  }
};
