/* eslint-disable callback-return */
/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { logMiddleware, logger } = require('./middleware/logger');
const { ErrorHandler, handleError } = require('./helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logMiddleware);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:id/tasks', tasksRouter);
app.use('*', (req, res, next) => {
  try {
    throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

process
  .on('unhandledRejection', (reason, promise) => {
    logger.error({
      message: 'Unhandled Rejection',
      reason,
      promise
    });
  })
  .on('uncaughtException', err => {
    logger.error({
      message: `Uncaught Exception ${err.message}`,
      err
    });
  });

module.exports = app;
