/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const constants = require('../config/constants');

const router = express.Router();
const v = `../modules/${path.basename(__filename, '.js')}`;

// Merchant Routes
const merchantRoutes = require(`${v}/merchant/merchantRoute`);
router.use('/merchants', merchantRoutes.merchantsRouter);
router.use('/merchant', merchantRoutes.merchantRouter);

// Parking Routes
const parkingRoutes = require(`${v}/parking/parkingRoute`);
router.use('/parkings', parkingRoutes.parkingsRouter);
router.use('/parking', parkingRoutes.parkingRouter);

// Account Routes
const accountRoutes = require(`${v}/account/accountRoute`);
router.use('/account', accountRoutes.accountRouter);

// Handle Undefine Routes
router.all('/*', (req, res) => {
  return res.status(constants.code.error.notFound).json({
    error: constants.messages.ERR_URL_NOT_FOUND,
  });
});

module.exports = router;
