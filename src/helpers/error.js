const { logger } = require('../middleware/logger');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  logger.error({
    statusCode,
    message
  });
  res.status(statusCode).json({
    status: 'Error',
    statusCode,
    message
  });
};

module.exports = {
  ErrorHandler,
  handleError
};
