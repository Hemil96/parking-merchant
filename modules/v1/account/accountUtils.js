const mongoose = require('mongoose');
const request = require('superagent');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const logger = require('../../../helper/logger');
const config = require('../../../config/database');
const utils = require('../../../helper/utils');
const constants = require('../../../config/constants');

// Merchant schema
const Merchant = mongoose.model('merchant');
const { code, messages } = constants;

// Encode Token
const encodeToken = async (dataToEncode) => {
  const token = await jwt.sign(dataToEncode, process.env.JWT_SECRET);
  return token;
};

// This will be used to sent verification mail
const generateOTP = async () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};

// Create account helper
const sendVerificationMail = (emailId, otp) => new Promise(async (resolve, reject) => {
  logger.info('Inside sendMail...');

  // create token
  const token = await encodeToken(emailId);

  // Email send accound
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Send Email
  const mailOptions = {
    from: `API test Topic <${process.env.SMTP_USERNAME}>`, // sender address
    to: emailId, // list of receivers
    subject: 'Verify Email', // Subject line
    // html: `OTP: ${otp}`, // html body
    html: `Verification Link : http://www.localhost:3000/api/v1/account/verify/${token}`, // html body
  };
  smtpTransport.sendMail(mailOptions)
    .then((response) => {
      logger.info(`Message sent: ${response.message}`);
      smtpTransport.close();
      resolve(response);
    })
    .catch((err) => {
      logger.error('Error in sendMail...', err);
      smtpTransport.close();
      reject(err);
    });
});

// Decode token
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    logger.info('STEP 2: Inside accountUtils "verifyToken"...');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      resolve(decoded);
    } catch (err) {
      logger.error('Error inside accountUtils "verifyToken"...', err);
      reject(err);
    }
  });
};

// ================================================================

// Create new Account
const create = async (data) => {
  return new Promise((resolve, reject) => {
    logger.info('STEP 2 :Inside the accountUtils "create"...');

    const {
      fullName, phone, referralCode, email,
      password,
    } = data;
    const objectTocreate = {
      fullName,
      phone,
      referralCode: referralCode || '',
      email,
      password,
    };

    utils.passToHash(password)
      .then(async (generatedHash) => {
        this.generatedOTP = await generateOTP();
        objectTocreate.password = generatedHash;
        return utils.createResource(objectTocreate, Merchant);
      })
      .then((createdAccount) => {
        this.createdAccount = createdAccount;
        logger.info('Step 3: account created now sending the email');
        const emailId = createdAccount.email;
        resolve({ user: this.createdAccount });
        // return sendVerificationMail(emailId, this.generatedOTP);
      })
      // .then((sendEmailResponse) => {
      //   resolve({ emailStatus: sendEmailResponse, user: this.createdAccount });
      // })
      .catch((err) => {
        logger.error('Error in create accountUtils', err);
        reject(err);
      });
  });
};

// Validate Util
const validate = (userId) => {
  return new Promise((resolve, reject) => {
    logger.info('STEP 3: Inside "validate" in accountUtil...');
    Merchant.findById(userId)
      .then((foundMerchant) => {
        if (!foundMerchant) return reject(messages.UNAUTHORIZED);
        return utils.updateResource({ email: foundMerchant.email }, { $set: { isActiveAccount: true } }, Merchant);
      })
      .then((updatedMerchant) => {
        resolve(updatedMerchant);
      })
      .catch((err) => {
        logger.error('Error inside "validate" in accountUtil...', err);
        reject(err);
      });
  });
};

const accountUtils = {
  create,
  verifyToken,
  validate,
  sendVerificationMail,
  encodeToken,
};

module.exports = accountUtils;
