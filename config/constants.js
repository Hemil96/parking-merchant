// Global configuration constant
const Enum = require('enum');

module.exports = {
  pager: {
    limit: 10,
    page: 0,
    staticCount: 20,
  },

  supportedMimeTypes: {
    documentTypes: ['application/pdf'],
    imageTypes: ['image/png', 'image/jpeg', 'image/jpg'],
  },

  checkBoolean: {
    bool: new Enum(['True', 'False']),
  },

  code: {
    success: 200,
    created: 201,
    error: {
      internalServerError: 500,
      badRequest: 400,
      unauthorized: 401,
      forbidden: 403,
      notFound: 404,
    },
  },

  messages: {
    ERR_URL_NOT_FOUND: 'URL not found',
    ERR_INTERNAL_SERVER: 'Internal Server Error',
    NO_RECORDS_FOUND: 'No records found',
    TOKEN_REQ: 'token is required',

    EMAIL_ID_EXISTS: 'Email already registed',
    ERR_VALID_EMAIL: 'Please enter valid email address',
    ERR_EMAIL_REQUIRED: 'email is required',
    ERR_PASS_REQUIRED: 'password is required',
    EMAIL_SENT: 'Email sent',
    INVALID_LOGIN_DETAIL: 'Invalid credetials',
    UNAUTHORIZED: 'Unauthorized',
    ERR_EMAIL_UDATE: "'email' can't be updated, only 'companyPrimaryNotifyEmail' can be updated!",

    RETRIVE_SUCCESS: 'Successfully retrived',
    DELETE_SUCCESS: 'Successfully deleted',
    CREATE_SUCCESS: 'Successfully created',
    UPDATE_SUCCESS: 'Successfully updated',


    INVALID_ID: 'Invalid id',
    INVALID_USER_ID: 'Invalid user id',

    INVALID_TXN_ID: 'Invalid transaction id',
    REQUIRED_PARTIES: 'parties is required',
    REQUIRED_URL: 'redirectURL is required',
    REQUIRED_PAYMENT: 'paymentInstructions is required',

    INVALID_DOC_ID: 'Invalid document id',
    DES_REQUIRED: 'Description required',
    DOC_REQUIRED: 'Document attachment required',

    ERR_WEBHOOK_REQUIRED: 'webhook is required',
    ERR_POST_TO_ESIGN_WEBHOOK: 'postToSignWebhook error',
    ERR_POST_TO_OAUTH: 'postToOauth error',

    VERIFY_FAILED: 'Verification failed',
    VERIFY_SUCCESS: 'Verified succesfully!',

    MEETINGSCHEDULED: 'Meeting Scheduled successfully',

    REQ_FIRSTNAME: 'firstName is required',
    REQ_LASTNAME: 'lastName is required',

    CRIC_API_RESPONSE_ERROR: 'Error while getting response from cricAPI!',

  },

  /**
     * It will return module signup message
     *
     * @param module
     *
     * @return {string}
     */
  registeredSuccess: module => `${module} registered successfully`,

  /**
     * It will return required field message
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkIfRequired: fieldName => `${fieldName} is required.`,

  /**
     * It will return message for valid URL.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkIfURL: fieldName => `The ${fieldName} must be a valid URL.`,

  /**
     * It will return message for alphanumeric field validation.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkIfAlphaNumeric: fieldName => `The ${fieldName} must be alpha numeric.`,

  /**
     * It will return message for numeric field validation.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkIfNumeric: fieldName => `The ${fieldName} field must be numeric.`,

  /**
     * It will return message for image extension validation
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkImageExtension: (fieldName, extension = 'jpg, png, jpeg') => `The ${fieldName} allows only (${extension}).`,

  /**
     * It will return message for valid date validation.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkIfValidDate: (fieldName, dateFormat = 'YYYY-MM-DD') => `The ${fieldName} must be in a (${dateFormat})`,

  /**
     * It will return message for valid email.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkIfEmail: fieldName => `${fieldName} must be a valid email address.`,

  /**
     * It will return message for valid integer.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkInt: fieldName => `The ${fieldName} must be a valid integer.`,

  /**
     * It will return message for valid float value.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkFloat: fieldName => `The ${fieldName} must be a valid float value.`,

  /**
     * It will return message for integer value between min and max value.
     *
     * @param {string} fieldName
     * @param {integer} min
     * @param {integer} max
     *
     * @return {string}
     */
  checkIntAndMinMax: (fieldName, min, max) => `The ${fieldName} must be an integer and`
        + ` between ${min} and ${max}.`,

  /**
     * It will return message for number value between min and max value.
     *
     * @param {string} fieldName
     * @param {integer} min
     * @param {integer} max
     *
     * @return {string}
     */
  checkNumberAndMinMax: (fieldName, min, max) => `The ${fieldName} must be a number and`
        + ` between ${min} and ${max}.`,

  /**
     * It will return message for field must be a string with min and max
     * number of characters
     *
     * @param fieldName
     * @param min
     * @param max
     *
     * @return {string}
     */
  checkStringMinAndMax: (fieldName, min, max) => `${fieldName} must be a string and`
        + ` between ${min} to ${max} characters.`,

  /**
     * It will return message for enum validation
     *
     * @param {string} fieldName
     * @param {array} enumArray
     *
     * @return {string}
     */
  checkIfValidEnum: (fieldName, enumArray) => `The ${fieldName} must have a valid value from ${enumArray}`,

  /**
     * It will return message for valid value.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkIfValidValue: fieldName => `The ${fieldName} must have a valid value`,

  /**
     * It will return message for valid non empty array.
     *
     * @param {string} fieldName
     *
     * @return {string}
     */
  checkIfArray: fieldName => `The ${fieldName} must not be empty`
        + ' and it should be a valid array.',

  /**
     *  It will return message when both field are not same
     *
     * @param {string} fieldName1
     * @param {string} fieldName2
     *
     * @return {string}
     */
  checkIfSame: (fieldName1, fieldName2) => `${fieldName1} and ${fieldName2} does not match`,

  /**
     * It will return message for success in list api.
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_LIST_SUCCESS: module => `${module} list.`,

  /**
     * It will return message for error in list api.
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_LIST_ERROR: module => `Error while listing ${module}.`,

  /**
     * It will return message for success in store api.
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_STORE_SUCCESS: module => `${module} added successfully!`,

  /**
     * It will return message for error is store api
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_STORE_ERROR: module => `Error while inserting ${module} details.`,

  /**
     * It will return message for success in specific get component
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_SHOW_SUCCESS: module => `${module} details.`,

  /**
     * It will return message for error in specific get component
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_SHOW_ERROR: module => `Error during getting ${module} details.`,

  /**
     * It will return message for components is already exist
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_EXISTS: module => `The ${module} already exists.`,

  /**
     * It will return message while component found
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_FOUND: module => `${module} found.`,

  /**
     * It will return message while component not found error
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_NOT_FOUND: module => `The ${module} you are looking for is not found.`,

  /**
     * It will return message for success in update component.
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_UPDATE_SUCCESS: module => `${module} details has been updated successfully!`,

  /**
     * It will return message for error in update component
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_UPDATE_ERROR: module => `Could not able update ${module} details.`,

  /**
     * It will return message for components if already updated
     *
     * @param {string} module - component name
     * @param {string} status - status name
     *
     * @return {string}
     */
  MODULE_STATUS_EXISTS: (module, status) => `${module} has already ${status}!`,

  /**
     * It will return message for success in enable/disable component.
     *
     * @param {string} module - component name
     * @param {string} status - enable / disable
     *
     * @return {string}
     */
  MODULE_STATUS_CHANGE: (module, status) => `${module} ${status} successfully!`,

  /**
     * It will return message for error in enable/disable component.
     *
     * @param {string} module - component name
     * @param {string} status - enable / disable
     *
     * @return {string}
     */
  MODULE_STAUS_CHANGE_ERROR: (module, status) => `Error while ${status} ${module}.`,

  /**
     * It will return message for error in delete component.
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_DELETE_ERROR: module => `Error while deleting ${module}`,

  /**
     * It will return message for success in delete component.
     *
     * @param {string} module - component name
     *
     * @return {string}
     */
  MODULE_DELETE_SUCCESS: module => `The ${module} has been deleted successfully`,

  /**
     * It will return message for error in uploaded file size limit
     *
     * @param {string} field - image field name
     * @param {number} size  - size of validated file.
     *
     * @return {string}
     */
  FILE_SIZE_LIMIT: (field, size) => `The ${field} size should be less than ${size} MB.`,

  /**
     * It will return message for success during file upload.
     *
     * @param {string} field - image field name
     *
     * @return {string}
     */
  FILE_UPLOAD_SUCCESS: field => `The ${field} has been uploaded successfully.`,

  /**
     * It will return message for valid non empty string.
     *
     * @param {string} fieldName
     * @param {integer} min
     * @param {integer} max
     *
     * @return {string}
     */
  checkLength: (fieldName, min, max) => {
    const minimum = typeof min !== 'undefined' ? min.toString() : '';
    const maximum = typeof max !== 'undefined' ? max.toString() : '';

    if (minimum === maximum) {
      return `${fieldName} length should be ${maximum} characters.`;
    } if (maximum === '') {
      return `${fieldName} length must be at least ${minimum} characters.`;
    } if (minimum === '') {
      return `${fieldName} length should not be greater`
                + ` than ${maximum} characters.`;
    }
    return `${fieldName} length must be between`
            + ` ${minimum} to ${maximum} characters.`;
  },
  /**
     * It will return message for valid json.
     *
     * @param {String} fieldName
     *
     * @return {String}
     */
  checkIfValidJSON: fieldName => `The ${fieldName} field must be a valid JSON String.`,

  // file upload
  FILE_TYPE_MISMATCH(module) {
    return `The ${module} must be a valid image file.`;
  },

};
