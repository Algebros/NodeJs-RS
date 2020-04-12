const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'info',
      filename: path.join(__dirname, '../../log/info.log')
    }),
    new transports.File({
      level: 'error',
      filename: path.join(__dirname, '../../log/error.log')
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '../../log/exception.log')
    })
  ]
});

function logMiddleware(req, res, next) {
  logger.info({
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body
  });
  next();
}

module.exports = {
  logger,
  logMiddleware
};
