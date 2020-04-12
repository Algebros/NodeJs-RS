const router = require('express').Router({ mergeParams: true });
const { ErrorHandler, catchErrors } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');
const taskService = require('./task.service');

router.route('/').get(
  catchErrors(async (req, res) => {
    const tasks = await taskService.getAll(req.params.id);
    res.json(tasks);
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
    }
    res.json(task);
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const task = await taskService.createTask(req.params.id, req.body);
    res.json(task);
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const task = await taskService.deleteTask(req.params.id);
    res.json(task);
  })
);

module.exports = router;
