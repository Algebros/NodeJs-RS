const { Schema, model } = require('mongoose');
const columnSchema = require('../column/column.model');

const boardSchema = new Schema({
  title: {
    type: String,
    default: 'Board'
  },
  columns: [columnSchema]
});

boardSchema.statics.toResponse = board => {
  const toString = Object.prototype.toString;
  if (toString.call(board) === '[object Array]') {
    const copyArray = board.slice();
    copyArray.forEach((item, idx, arr) => {
      const { id, title, columns } = item;
      arr[idx] = { id, title, columns };
    });
    return copyArray;
  }
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = model('boardSchema', boardSchema);
