/* eslint-disable no-unused-vars */
const router = require('express').Router();
const validator = require('../../middleware/validator');
const boardSchema = require('./board.model');
const taskSchema = require('../tasks/task.model');
const { ErrorHandler, catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchErrors(async (req, res) => {
    const board = await boardSchema.find();
    res.json(boardSchema.toResponse(board));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardSchema.create(req.body);
    res.json(boardSchema.toResponse(board));
  })
);

router.route('/:id').get(
  validator,
  catchErrors(async (req, res) => {
    const board = await boardSchema.findById(req.params.id);
    if (board) res.json(boardSchema.toResponse(board));
    else throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  })
);

router.route('/:id').put(
  validator,
  catchErrors(async (req, res) => {
    const board = await boardSchema.findByIdAndUpdate(req.params.id, req.body);
    res.json();
  })
);

router.route('/:id').delete(
  validator,
  catchErrors(async (req, res) => {
    const board = await boardSchema.findByIdAndDelete(req.params.id);
    await taskSchema.deleteMany({ boardId: req.params.id });
    res.status(getStatusCode('No Content')).send();
  })
);

module.exports = router;
