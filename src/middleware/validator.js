/* eslint-disable callback-return */
const UserSchema = require('../resources/users/user.model');
const { getStatusCode, getStatusText } = require('http-status-codes');
const { ErrorHandler } = require('../helpers/error');

const validator = (req, res, next) => {
  try {
    if (req.params.id) {
      const isValid = UserSchema.isValid(req.params.id);
      if (!isValid) {
        throw new ErrorHandler(
          getStatusCode('Bad Request'),
          getStatusText(400)
        );
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validator;
