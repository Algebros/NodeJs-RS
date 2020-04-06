const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const createBoard = data => boardsRepo.createBoard(data);
const getBoardById = id => boardsRepo.getBoardById(id);
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);
const deleteBoard = id => {
  tasksService.deleteTaskByBoard(id);
  boardsRepo.deleteBoard(id);
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
