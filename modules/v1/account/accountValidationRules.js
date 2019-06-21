const { check, validationResult } = require('express-validator/check');
const constants = require('../../../config/constants');

const { code, messages } = constants;


const emailSignUpValidation = [
  [
    // email must be an email
    check('email')
      .isLength({
        min: 1,
      })
      .withMessage(constants.checkIfRequired('email'))
      .isEmail()
      .withMessage(constants.checkIfEmail('email')),

    check('password')
      .isLength({
        min: 1,
      })
      .withMessage(constants.checkIfRequired('password')),

    check('fullName')
      .isLength({
        min: 1,
      })
      .withMessage(constants.checkIfRequired('fullName')),

    check('phone')
      .isLength({ min: 10 })
      .withMessage(constants.checkLength('phone', 10, 20))
      .isNumeric()
      .withMessage(constants.checkIfNumeric('phone')),
  ],
];

const emailLoginValidation = [
  [
    // email must be an email
    check('email')
      .isLength({
        min: 1,
      })
      .withMessage(constants.checkIfRequired('email'))
      .isEmail()
      .withMessage(constants.checkIfEmail('email')),

    check('password')
      .isLength({
        min: 1,
      })
      .withMessage(constants.checkIfRequired('password')),
  ],
];


// Name, Email or Phone, Fb Id
const facebookLoginValidation = [
  [
    // email must be an email
    check('fullName')
      .isLength({
        min: 1,
      })
      .withMessage(constants.checkIfRequired('fullName')),

    check('facebookID')
      .isLength({ min: 1 })
      .withMessage(constants.checkIfRequired('facebookID')),
  ],
];

// Name, Email or Phone, Fb Id
const forgotPass = [
  [
    // email must be an email
    check('phone')
      .isLength({
        min: 1,
      })
      .withMessage(constants.checkIfRequired('phone')),

    check('newPassword')
      .isLength({ min: 1 })
      .withMessage(constants.checkIfRequired('newPassword')),
  ],
];

const checkValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const err = result.array()[0].msg;
    return res.status(code.error.badRequest).json({ error: err });
  }
  next();
};

const accountValidations = {
  emailLoginValidation, forgotPass, checkValidationResult, facebookLoginValidation, emailSignUpValidation,
};

module.exports = accountValidations;
