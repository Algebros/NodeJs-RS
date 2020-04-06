const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.id);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ err: 'Task not found' });
  res.json(task);
});

router.route('/').post(async (req, res) => {
  const task = await taskService.createTask(req.params.id, req.body);
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  const task = await taskService.deleteTask(req.params.id);
  res.json(task);
});

module.exports = router;
