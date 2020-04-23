/* eslint-disable callback-return */
const router = require('express').Router();
const userService = require('../users/user.service');
const validator = require('../../middleware/validator');
const { ErrorHandler, catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchErrors(async (req, res) => {
    const user = await userService.getAll();
    res.status(getStatusCode('OK')).json(user);
  })
);

router.route('/:id').get(
  validator,
  catchErrors(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (user) res.status(getStatusCode('OK')).json(user);
    else throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  })
);

router.route('/').post(
  validator,
  catchErrors(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(getStatusCode('OK')).json(user);
  })
);

router.route('/:id').put(
  validator,
  catchErrors(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) res.status(getStatusCode('OK')).json();
    else throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  })
);

router.route('/:id').delete(
  validator,
  catchErrors(async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    if (user) res.status(getStatusCode('OK')).json();
    else throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  })
);

module.exports = router;
