/* eslint-disable no-unused-vars */
const router = require('express').Router();
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
  catchErrors(async (req, res) => {
    const board = await boardSchema.findById(req.params.id);
    res.json(boardSchema.toResponse(board));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardSchema.findByIdAndUpdate(req.params.id, req.body);
    res.json();
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    // await boardSchema.findByIdAndDelete(req.params.id);
    // await taskSchema.findByIdAndDelete(req.params.id);
    res.json();
  })
);

module.exports = router;
