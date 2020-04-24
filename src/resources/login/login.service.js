const jwt = require('jsonwebtoken');
const userSchema = require('../users/user.model');
const { ErrorHandler } = require('../../helpers/error');
const { JWT_SECRET_KEY } = require('../../common/config');
const { getStatusCode, getStatusText } = require('http-status-codes');

const checkUser = async ({ login, password }) => {
  const user = await userSchema.findOne({ login });
  if (!user) {
    throw new ErrorHandler(getStatusCode('Forbidden'), getStatusText(403));
  }

  const isMath = await user.comparePassword(password);
  if (!isMath) {
    throw new ErrorHandler(getStatusCode('Forbidden'), getStatusText(403));
  }
  return jwt.sign({ login, id: user._id }, JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
};

module.exports = { checkUser };
