const UserSchema = require('./user.model');
const taskSchema = require('../tasks/task.model');
const { ErrorHandler } = require('../../helpers/error');
const { getStatusCode, getStatusText } = require('http-status-codes');

const getAll = async () => {
  const user = await UserSchema.find();
  return UserSchema.toResponse(user);
};

const getUserById = async id => {
  const user = await UserSchema.findById(id);
  if (user) return await UserSchema.toResponse(user);
  throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
};

const createUser = async data => {
  const user = await UserSchema.create(data);
  return await UserSchema.toResponse(user);
};

const updateUser = async (id, data) => {
  const user = await UserSchema.findByIdAndUpdate(id, data);
  if (user) return user;
  throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
};
const deleteUser = async id => {
  const user = await UserSchema.findByIdAndDelete(id);
  if (!user) {
    throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
  } else await taskSchema.updateMany({ userId: id }, { userId: null });
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};
