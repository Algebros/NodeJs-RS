const Task = require('./task.model');

let data = [];

const getAll = async id => data.filter(i => i.boardId === id);
const getTaskById = async id => data.find(i => i.id === id);
const deleteTask = async id => (data = data.filter(i => i.id !== id));
const deleteTaskByBoard = id => (data = data.filter(i => i.boardId !== id));

const createTask = async (id, task) => {
  const newTask = new Task(Object.assign(task, { boardId: id }));
  data.push(newTask);
  return newTask;
};

const updateTask = async (id, newTask) => {
  const idx = data.findIndex(i => i.id === id);
  Object.assign(data[idx], newTask);
  return data[idx];
};

const taskEqNull = async id => {
  data.map(i => {
    if (i.userId === id) i.userId = null;
    return i;
  });
};

module.exports = {
  getAll,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  taskEqNull,
  deleteTaskByBoard
};
