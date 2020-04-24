const router = require('express').Router();
const loginService = require('./login.service');
const { catchErrors } = require('../../helpers/error');

router.route('/').post(
  catchErrors(async (req, res) => {
    const token = await loginService.checkUser(req.body);
    res.json({ token });
  })
);

module.exports = router;
