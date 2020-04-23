/* eslint-disable callback-return */
const router = require('express').Router();
const UserSchema = require('./user.model');
const taskSchema = require('../tasks/task.model');
const validator = require('../../middleware/validator');
const { ErrorHandler, catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchErrors(async (req, res) => {
    const user = await UserSchema.find();
    res.status(getStatusCode('OK')).json(UserSchema.toResponse(user));
  })
);

router.route('/:id').get(
  validator,
  catchErrors(async (req, res) => {
    const user = await UserSchema.findById(req.params.id);
    if (user) res.status(getStatusCode('OK')).json(UserSchema.toResponse(user));
    else throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  })
);

router.route('/').post(
  validator,
  catchErrors(async (req, res) => {
    const user = await UserSchema.create(req.body);
    res.status(getStatusCode('OK')).json(UserSchema.toResponse(user));
  })
);

router.route('/:id').put(
  validator,
  catchErrors(async (req, res) => {
    const user = await UserSchema.findByIdAndUpdate(req.params.id, req.body);
    if (user) res.status(getStatusCode('OK')).json();
    else throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  })
);

router.route('/:id').delete(
  validator,
  catchErrors(async (req, res) => {
    const user = await UserSchema.findByIdAndDelete(req.params.id);
    await taskSchema.updateMany({ userId: req.params.id }, { userId: null });
    if (user) res.status(getStatusCode('OK')).json();
    else throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  })
);

module.exports = router;
