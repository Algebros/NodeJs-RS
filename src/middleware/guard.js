/* eslint-disable callback-return */
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const { getStatusCode, getStatusText } = require('http-status-codes');
const { ErrorHandler } = require('../helpers/error');

const guard = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new ErrorHandler(getStatusCode('Unauthorized'), getStatusText(401));
    }

    // eslint-disable-next-line no-unused-vars
    const [_, token] = req.headers.authorization.split(' ');
    const isVerify = await jwt.verify(token, JWT_SECRET_KEY);
    if (!isVerify) {
      throw new ErrorHandler(getStatusCode('Unauthorized'), getStatusText(401));
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  guard
};
