/* eslint-disable no-unused-vars */
const router = require('express').Router({ mergeParams: true });
const taskSchema = require('./task.model');
const boardSchema = require('../boards/board.model');
const validator = require('../../middleware/validator');
const { ErrorHandler, catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchErrors(async (req, res) => {
    const task = await taskSchema.find({ boardId: req.params.boardId });
    res.json(taskSchema.toResponse(task));
  })
);

router.route('/:id').get(
  validator,
  catchErrors(async (req, res) => {
    const task = await taskSchema.findOne({
      boardId: req.params.boardId,
      _id: req.params.id
    });
    if (task) res.status(getStatusCode('OK')).json(taskSchema.toResponse(task));
    else throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await taskSchema.create(
      Object.assign(req.body, { boardId: req.params.boardId })
    );
    res.json(taskSchema.toResponse(task));
  })
);

router.route('/:id').put(
  validator,
  catchErrors(async (req, res) => {
    const task = await taskSchema.updateOne(
      { boardId: req.params.boardId, _id: req.params.id },
      req.body
    );
    res.status(getStatusCode('OK')).json(taskSchema.toResponse(task));
  })
);

router.route('/:id').delete(
  validator,
  catchErrors(async (req, res) => {
    const task = await taskSchema.deleteOne({
      boardId: req.params.boardId,
      _id: req.params.id
    });
    res.status(getStatusCode('No Content')).send();
  })
);

module.exports = router;
