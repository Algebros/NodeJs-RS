const taskRepo = require('./task.memory.repository');

const getAll = id => taskRepo.getAll(id);
const getTaskById = id => taskRepo.getTaskById(id);
const deleteTask = id => taskRepo.deleteTask(id);
const updateTask = (id, data) => taskRepo.updateTask(id, data);
const createTask = (id, data) => taskRepo.createTask(id, data);
const taskEqNull = id => taskRepo.taskEqNull(id);
const deleteTaskByBoard = id => taskRepo.deleteTaskByBoard(id);

module.exports = {
  getAll,
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
  taskEqNull,
  deleteTaskByBoard
};
