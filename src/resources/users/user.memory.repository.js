const userModel = require('./user.model');

let data = [];

const getAll = async () => data;
const getUserById = async id => data.find(i => i.id === id);
const deleteUser = async id => (data = data.filter(i => i.id !== id));

const createUser = async user => {
  const newUser = new userModel(user);
  data.push(newUser);
  return newUser;
};

const updateUser = async (id, newData) => {
  const idx = data.findIndex(i => i.id === id);
  Object.assign(data[idx], newData);
  return data[idx];
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};
