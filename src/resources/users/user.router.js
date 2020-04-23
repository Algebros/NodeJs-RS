const router = require('express').Router();
const userService = require('../users/user.service');
const validator = require('../../middleware/validator');
const { catchErrors } = require('../../helpers/error');
const { getStatusCode } = require('http-status-codes');

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
    res.status(getStatusCode('OK')).json(user);
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
    await userService.updateUser(req.params.id, req.body);
    res.status(getStatusCode('OK')).json();
  })
);

router.route('/:id').delete(
  validator,
  catchErrors(async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(getStatusCode('OK')).json();
  })
);

module.exports = router;
