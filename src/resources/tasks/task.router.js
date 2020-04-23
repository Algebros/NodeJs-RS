/* eslint-disable no-unused-vars */
const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const taskSchema = require('./task.model');
const boardSchema = require('../boards/board.model');
const validator = require('../../middleware/validator');
const { catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

router.route('/').get(
  catchErrors(async (req, res) => {
    const task = await taskService.getAll(req.params.boardId);
    res.json(task);
  })
);

router.route('/:id').get(
  validator,
  catchErrors(async (req, res) => {
    const task = await taskService.getTaskById(
      req.params.id,
      req.params.boardId
    );
    res.status(getStatusCode('OK')).json(task);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await taskService.createTask(req.params.boardId, req.body);
    res.json(task);
  })
);

router.route('/:id').put(
  validator,
  catchErrors(async (req, res) => {
    const task = await taskService.updateTask(
      req.params.id,
      req.params.boardId,
      req.body
    );
    res.status(getStatusCode('OK')).json(task);
  })
);

router.route('/:id').delete(
  validator,
  catchErrors(async (req, res) => {
    await taskService.deleteTask(req.params.id, req.params.boardId);
    res.status(getStatusCode('No Content')).send();
  })
);

module.exports = router;
