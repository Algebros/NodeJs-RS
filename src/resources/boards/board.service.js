const boardSchema = require('./board.model');
const taskSchema = require('../tasks/task.model');
const { ErrorHandler } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

const getAll = async () => {
  const board = await boardSchema.find();
  return await boardSchema.toResponse(board);
};
const createBoard = async data => {
  const board = await boardSchema.create(data);
  return await boardSchema.toResponse(board);
};
const getBoardById = async id => {
  const board = await boardSchema.findById(id);
  if (board) return await boardSchema.toResponse(board);
  throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
};
const updateBoard = async (id, data) => {
  await boardSchema.findByIdAndUpdate(id, data);
};
const deleteBoard = async id => {
  await boardSchema.findByIdAndDelete(id);
  await taskSchema.deleteMany({ boardId: id });
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
