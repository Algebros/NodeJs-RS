const { Schema, model, Types } = require('mongoose');

const taskSchema = new Schema({
  title: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  userId: {
    type: Types.ObjectId,
    ref: 'userSchema'
  },
  boardId: {
    type: Types.ObjectId,
    ref: 'boardSchema'
  },
  columnId: {
    type: Types.ObjectId,
    ref: 'columnSchema'
  }
});

taskSchema.statics.toResponse = task => {
  const toString = Object.prototype.toString;
  if (toString.call(task) === '[object Array]') {
    const copyArray = task.slice();
    copyArray.forEach((item, idx, arr) => {
      const { id, title, order, description, userId, boardId, columnId } = item;
      arr[idx] = { id, title, order, description, userId, boardId, columnId };
    });
    return copyArray;
  }
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = model('taskSchema', taskSchema);
