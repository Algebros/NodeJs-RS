const { Schema } = require('mongoose');

const columnSchema = new Schema({
  title: {
    type: String,
    default: 'Column'
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = columnSchema;
