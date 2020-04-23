/* eslint-disable no-unused-vars */
const router = require('express').Router();
const validator = require('../../middleware/validator');
const boardService = require('./board.service');
const boardSchema = require('./board.model');
const taskSchema = require('../tasks/task.model');
const { catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchErrors(async (req, res) => {
    const board = await boardService.getAll();
    res.json(board);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const body = await boardService.createBoard(req.body);
    res.json(body);
  })
);

router.route('/:id').get(
  validator,
  catchErrors(async (req, res) => {
    const board = await boardService.getBoardById(req.params.id);
    res.json(board);
  })
);

router.route('/:id').put(
  validator,
  catchErrors(async (req, res) => {
    await boardService.updateBoard(req.params.id, req.body);
    res.json();
  })
);

router.route('/:id').delete(
  validator,
  catchErrors(async (req, res) => {
    await boardService.deleteBoard(req.params.id);
    res.status(getStatusCode('No Content')).send();
  })
);

module.exports = router;
