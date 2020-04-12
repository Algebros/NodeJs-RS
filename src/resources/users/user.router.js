/* eslint-disable callback-return */
const router = require('express').Router();
const { ErrorHandler, catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    if (!user) {
      throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
    }
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.json(user);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const user = await usersService.deleteUser(req.params.id);
    res.json(user);
  })
);

module.exports = router;
