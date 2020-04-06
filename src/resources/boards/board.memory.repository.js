const boardsModel = require('./board.model');

let data = [];

const getAll = async () => data;
const getBoardById = async id => data.find(i => i.id === id);
const deleteBoard = async id => (data = data.filter(i => i.id !== id));

const createBoard = async board => {
  const newBoard = new boardsModel(board);
  data.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, newBoard) => {
  const idx = data.findIndex(i => i.id === id);
  Object.assign(data[idx], newBoard);
  return data[idx];
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
