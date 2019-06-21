const express = require('express');
const accountCtr = require('./accountController');
const middleware = require('../../../middleware');
const accountMiddleware = require('./accountMiddleware');
const accVal = require('./accountValidationRules');

const accountRouter = express.Router();

// /accounts
accountRouter
  .post('/signup',
    [accVal.emailLoginValidation, accVal.checkValidationResult, accountMiddleware.isUniqueEmail],
    accountCtr.create); // Create New Account with Email

accountRouter
  .post('/login',
    [accVal.emailLoginValidation, accVal.checkValidationResult],
    accountCtr.login); // Login with Email\

accountRouter.post('/forgotPassword', [accVal.forgotPass, accVal.checkValidationResult], accountCtr.forgotPassword);

accountRouter.post('/verify/:token', accountMiddleware.checkOTP, accountCtr.verifyOTP); // Validate Account
// accountRouter.get('/resendEmail', accountMiddleware.checkEmail, accountCtr.resendEmail); // Request verification mail

module.exports = { accountRouter };
