const express = require('express');
const merchantCtr = require('./merchantController');
const middleware = require('../../../middleware');
const validationRules = require('./merchantValidationRules');
const merMiddleware = require('./merchantMiddleware');

// Sapareting Routes for User and Users
const merchantRouter = express.Router();
const merchantsRouter = express.Router();

// /merchants
merchantsRouter.get('/', middleware.checkToken, merchantCtr.getAll); // Retrive All Users

merchantRouter.get('/:id', [merMiddleware.checkMerchantId, middleware.checkToken], merchantCtr.getMerchantById); // Retrive merchant by ID
// merchantRouter.delete('/:id', merchantCtr.deleteUser); // Delete User
merchantRouter.patch('/:id', merchantCtr.update); // Create User

// merchantsRouter.post('/', [middleware.checkToken, merchantMiddleware.checkUserRoles, merchantMiddleware.checkIsoDate], merchantCtr.create); // Create New User
// merchantRouter.delete('/:id', [middleware.checkToken, merchantMiddleware.checkUserRoles, merchantMiddleware.checkUserId], merchantCtr.deleteUser); // Delete User

module.exports = { merchantRouter, merchantsRouter };
