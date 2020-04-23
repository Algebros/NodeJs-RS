const UserSchema = require('./user.model');
const taskSchema = require('../tasks/task.model');

const getAll = async () => {
  const user = await UserSchema.find();
  return UserSchema.toResponse(user);
};

const getUserById = async id => {
  const user = await UserSchema.findById(id);
  return await UserSchema.toResponse(user);
};

const createUser = async data => {
  const user = await UserSchema.create(data);
  return await UserSchema.toResponse(user);
};

const updateUser = async (id, data) => {
  return await UserSchema.findByIdAndUpdate(id, data);
};
const deleteUser = async id => {
  const user = await UserSchema.findByIdAndDelete(id);
  await taskSchema.updateMany({ userId: id }, { userId: null });
  return user;
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};
