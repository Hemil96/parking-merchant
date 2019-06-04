const bs58 = require('bs58');
const request = require('superagent');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const logger = require('./logger');
const constants = require('../config/constants');

const { messages, code } = constants;

const notFoundError = { code: code.error.notFound, error: messages.NO_RECORDS_FOUND };
const internalServerError = {
  code: code.error.internalServerError, error: messages.ERR_INTERNAL_SERVER,
};


/**
 * Return the Count of Data
 * @param {Object} query : It will be query to fetch the resource, Example { 'age': 18 }
 * @param Model : Model in which the query will be executed
 */
const checkResourceCount = (query, Model) => {
  logger.info('Inside the Util checkResourceCount...');
  return new Promise(((resolve, reject) => {
    Model.countDocuments(query)
      .then((count) => {
        resolve(JSON.parse(JSON.stringify(count)));
      })
      .catch((err) => {
        logger.error('Error in checkResourceCount ...', err);
        reject(err);
      });
  }));
};

// Generate Token
const generateTokenString = () => {
  const generatedTokenString = bs58.encode(crypto.randomBytes(64)).toString().substring(0, 16);
  return generatedTokenString;
};

// Retrive all from model
const findAll = (Model) => {
  return new Promise((resolve, reject) => {
    Model.find()
      .then((modelItems) => {
        if (!modelItems.length) reject(notFoundError);
        resolve(JSON.parse(JSON.stringify(modelItems)));
      })
      .catch((err) => {
        logger.error('Error in findAll ...', err);
        reject(err);
      });
  });
};

// Find resource
const findResource = (query, Model) => {
  return new Promise((resolve, reject) => {
    Model.findOne(query)
      .then((modelItem) => {
        if (!modelItem) {
          reject(notFoundError);
        }
        resolve(JSON.parse(JSON.stringify(modelItem)));
      })
      .catch((err) => {
        logger.error('Error in findResource ...', err);
        reject(err);
      });
  });
};

// Find multiple resources
const findMultipleResource = (query, Model) => {
  return new Promise((resolve, reject) => {
    Model.find(query)
      .then((modelItem) => {
        if (!modelItem) {
          reject(notFoundError);
        }
        resolve(JSON.parse(JSON.stringify(modelItem)));
      })
      .catch((err) => {
        logger.error('Error in findMultipleResource ...', err);
        reject(err);
      });
  });
};

// Create Resource
const createResource = (objectToCreate, Model) => {
  return new Promise((resolve, reject) => {
    const data = new Model(objectToCreate);
    data.save()
      .then((createdItem) => {
        if (!createdItem) reject(internalServerError);
        resolve(JSON.parse(JSON.stringify(createdItem)));
      })
      .catch((err) => {
        logger.error('Error in createResource ...', err);
        reject(err);
      });
  });
};

// Update Recource
const updateResource = (query, update, Model) => {
  return new Promise((resolve, reject) => {
    Model.findOneAndUpdate(query, update, { new: true })
      .then((updatedItem) => {
        resolve(JSON.parse(JSON.stringify(updatedItem)));
      })
      .catch((err) => {
        logger.error('Error in updateResource ...', err);
        reject(err);
      });
  });
};

// Upload file hanlde [Out of use]
const generateHandle = () => {
  logger.info('Inside generateHandle...');
  let handle = bs58.encode(crypto.randomBytes(32)).toString();
  handle = handle.toLowerCase();
  return handle;
};

// create hash
const hash = crypto.createHash('sha1');

// Find multiple resources by array of ids
const findResourcesByArray = (array, Model) => {
  return new Promise((resolve, reject) => {
    const allPromise = [];
    array.forEach((item) => {
      allPromise.push(findResource({ _id: item }, Model));
    });
    Promise.all(allPromise)
      .then((foundData) => {
        resolve(foundData);
      })
      .catch((err) => {
        logger.error('Error in findResourcesByArray ...', err);
        reject(err);
      });
  });
};

// User password encryption
const passToHash = (password) => {
  return new Promise((resolve, reject) => {
    logger.info('Inside passToHash... ');
    bcrypt.hash(password, 10)
      .then((generatedHash) => {
        resolve(generatedHash);
      })
      .catch((err) => {
        logger.error('Error in passToHash ...', err);
        reject(err);
      });
  });
};

// Match password hash with password text
const comparePassword = (textPassword, hashTodecode) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(textPassword, hashTodecode)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        logger.error('Error in comparePassword ...', err);
        reject(err);
      });
  });
};

// Token will be verify on OAuth server
const verifyOauthToken = (token) => {
  return new Promise((resolve, reject) => {
    // Validate request to OAuth server
    const url = `${process.env.OAUTH_BASE_URL}/oauth2/verify`;
    const headers = {
      Authorization: token,
    };
    request
      .get(url)
      .set(headers)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        logger.error('Error in verifyOauthToken ...', err);
        reject(err);
      });
  });
};

// Collection of functions to export
const utils = {
  checkResourceCount,
  generateTokenString,
  generateHandle,
  findAll,
  findResource,
  findMultipleResource,
  createResource,
  updateResource,
  hash,
  findResourcesByArray,
  passToHash,
  comparePassword,
  verifyOauthToken,
};

module.exports = utils;
