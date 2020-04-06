const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const updateUser = (id, data) => usersRepo.updateUser(id, data);
const createUser = data => usersRepo.createUser(data);
const deleteUser = id => {
  tasksService.taskEqNull(id);
  usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};
