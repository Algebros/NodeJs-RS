const taskSchema = require('./task.model');
const { ErrorHandler } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

const getAll = async id => {
  const task = await taskSchema.find({ boardId: id });
  return await taskSchema.toResponse(task);
};

const getTaskById = async (_id, boardId) => {
  const task = await taskSchema.findOne({
    boardId,
    _id
  });
  if (task) return await taskSchema.toResponse(task);
  throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
};

const createTask = async (id, data) => {
  const task = await taskSchema.create(Object.assign(data, { boardId: id }));
  return await taskSchema.toResponse(task);
};

const updateTask = async (_id, boardId, data) => {
  const task = await taskSchema.updateOne({ boardId, _id }, data);
  return await taskSchema.toResponse(task);
};

const deleteTask = async (_id, boardId) => {
  await taskSchema.deleteOne({
    _id,
    boardId
  });
};

module.exports = {
  getAll,
  createTask,
  getTaskById,
  deleteTask,
  updateTask
};
