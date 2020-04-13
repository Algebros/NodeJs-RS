const { Schema, model } = require('mongoose');

const columnSchema = new Schema({
  title: {
    type: String,
    default: 'test'
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = model('columnSchema', columnSchema);
