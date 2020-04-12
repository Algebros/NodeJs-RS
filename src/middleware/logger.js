const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, '../../log/info.log'),
      level: 'info'
    }),
    new transports.File({
      filename: path.join(__dirname, '../../log/error.log'),
      level: 'error'
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
  logMiddleware
};
